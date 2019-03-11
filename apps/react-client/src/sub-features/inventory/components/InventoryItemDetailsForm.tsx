import * as React from 'react';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItem } from './InventoryItemsList';
import { Omitted } from '../../../shared/types/omitted.type';
import { Select, TextField } from 'formik-material-ui';
import {
  TranslatedInventoryItemUnit,
  allInventoryItemUnits,
} from '../selectors/translated-inventory-item-units.selector';
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Chip,
  Theme,
} from '@material-ui/core';

export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly tagSuggestions: Array<string>;
  readonly isInEditMode: boolean;
  readonly onSubmit: (params: {
    readonly item: Omitted<InventoryItem, 'id'>;
  }) => void;
  readonly onCancelEdit: () => void;
}

interface InventoryItemDetailsFormState {
  /**
   * Keep tags independently in state because they are implemented using chips
   * and thus not part of main Formik form.
   */
  readonly tags: Array<string>;
  readonly tagsAreDirty: boolean;
}

// TODO: implement alternates
export class StyledInventoryItemDetailsForm extends React.Component<
  StyledTranslatedInventoryItemDetailsFormProps,
  InventoryItemDetailsFormState
> {
  public state: InventoryItemDetailsFormState = {
    tags: [],
    tagsAreDirty: false,
  };

  public componentDidUpdate(): void {
    const itemTags = (this.props.item && this.props.item.tags) || [];
    if (
      this.state.tagsAreDirty ||
      (itemTags.length === 0 && this.state.tags.length === 0) ||
      // This can potentially cause infinite set state loop
      // Be careful with reference comparison, consider refactoring with array contents comparison
      itemTags === this.state.tags
    ) {
      return;
    }
    this.setState({
      tags: (this.props.item && this.props.item.tags) || [],
      tagsAreDirty: false,
    });
  }

  public handleDeleteTagClick = (tagToDelete: string): void => {
    this.setState((previousState: InventoryItemDetailsFormState) => ({
      tags:
        previousState.tags &&
        previousState.tags.filter(tag => tag !== tagToDelete),
      tagsAreDirty: true,
    }));
  };

  public handleNewTagInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const newTag = input.value;

    this.setState((previousState: InventoryItemDetailsFormState) => ({
      tags: previousState.tags ? [...previousState.tags, newTag] : [newTag],
      tagsAreDirty: true,
    }));
    // TODO: clear new tag input value
  };

  public render(): JSX.Element {
    const {
      classes,
      intl,
      item,
      itemUnits,
      isInEditMode,
      onSubmit,
      onCancelEdit,
    } = this.props;
    const initialFormValues = item
      ? {
          ...item,
          newTag: '',
        }
      : {
          name: '',
          unit: '',
          alternates: [],
          newTag: '',
        };

    const nameFieldName = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label',
    });
    const tagsFieldName = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label',
    });
    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .required(
          intl.formatMessage(
            {
              id: 'common.validationErrorMessage.requiredField',
            },
            {
              fieldName: nameFieldName,
            },
          ),
        )
        .min(
          3,
          intl.formatMessage(
            { id: 'common.validationErrorMessage.stringMin' },
            { fieldName: nameFieldName },
          ),
        ),
      unit: yup
        .mixed()
        .required()
        .oneOf(allInventoryItemUnits),
      newTag: yup
        .string()
        .min(
          3,
          intl.formatMessage(
            { id: 'common.validationErrorMessage.stringMin' },
            { fieldName: tagsFieldName },
          ),
        ),
      alternates: yup.array(
        yup.object({
          id: yup.string().required(),
          name: yup.string(),
        }),
      ),
    });
    const unitOptions = (itemUnits || []).map(unit => (
      <MenuItem key={unit.unitValue} value={unit.unitValue}>
        {unit.unitLabelFull} ({unit.unitLabelShort})
      </MenuItem>
    ));

    return (
      <Formik
        enableReinitialize={true}
        isInitialValid={true}
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const { newTag, ...itemValues } = values;
          const tags = newTag ? [...this.state.tags, newTag] : this.state.tags;

          onSubmit({
            item: {
              ...(itemValues as Omitted<InventoryItem, 'id'>),
              tags,
            },
          });
          actions.setSubmitting(false);
        }}
        render={({ submitForm, resetForm, isValid, dirty, values }) => (
          <Form>
            <Grid container spacing={24}>
              {/* Name */}
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  disabled={!isInEditMode}
                  label={nameFieldName}
                  fullWidth={true}
                />
              </Grid>

              {/* Units */}
              <Grid item xs={12}>
                <FormControl disabled={!isInEditMode} fullWidth={true}>
                  <InputLabel shrink htmlFor="inventory-item-units-label">
                    <FormattedMessage id="inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label" />
                  </InputLabel>
                  <Field
                    component={Select}
                    name="unit"
                    disabled={!isInEditMode}
                    inputProps={{
                      name: 'unit',
                      id: 'inventory-item-units-label',
                    }}
                  >
                    {unitOptions}
                  </Field>
                </FormControl>
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                {this.state.tags &&
                  this.state.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      className={classes.tagChip}
                      onDelete={
                        isInEditMode
                          ? () => this.handleDeleteTagClick(tag)
                          : undefined
                      }
                    />
                  ))}
                {/* New tag input */}
                {isInEditMode && (
                  <Field
                    component={TextField}
                    name="newTag"
                    label={tagsFieldName}
                    fullWidth={!this.state.tags || this.state.tags.length === 0}
                    onKeyDown={this.handleNewTagInputKeyDown}
                  />
                )}
              </Grid>

              {isInEditMode && (
                <Grid item xs={12} className={classes.buttonsRow}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      resetForm();
                      onCancelEdit();
                      this.setState({
                        tags: (item && item.tags) || [],
                        tagsAreDirty: false,
                      });
                    }}
                  >
                    <FormattedMessage id="common.cancelButtonLabel" />
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      !isInEditMode ||
                      !isValid ||
                      (!dirty && !this.state.tagsAreDirty)
                    }
                    onClick={submitForm}
                  >
                    <FormattedMessage id="common.saveButtonLabel" />
                  </Button>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      />
    );
  }
}

const inventoryItemDetailsFormStyles = ({ spacing }: Theme) =>
  createStyles({
    buttonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tagChip: {
      marginRight: spacing.unit,
      // TODO: check if this is needed after input markup is added
      marginTop: spacing.unit * 2,
    },
  });

type StyledTranslatedInventoryItemDetailsFormProps = InventoryItemDetailsFormProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryItemDetailsFormStyles>;

const TranslatedInventoryItemDetailsForm = injectIntl(
  StyledInventoryItemDetailsForm,
);
export const InventoryItemDetailsForm = withStyles(
  inventoryItemDetailsFormStyles,
)(TranslatedInventoryItemDetailsForm);
