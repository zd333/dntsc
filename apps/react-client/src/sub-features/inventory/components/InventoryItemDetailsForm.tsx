import * as React from 'react';
import * as yup from 'yup';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItem } from './InventoryItemsList';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { Omitted } from '../../../shared/types/omitted.type';
import { Select, TextField } from 'formik-material-ui';
import {
  Field,
  Form,
  Formik,
  FormikActions,
  FormikProps,
  FieldProps,
} from 'formik';
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
  Theme,
} from '@material-ui/core';
import {
  AutocompleteProps,
  Autocomplete,
} from '../../../shared/components/Autocomplete';

export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly tagSuggestions: Array<string>;
  readonly alternatesSuggestions: InventoryItemsAlternatesSuggestions;
  readonly isInEditMode: boolean;
  readonly onSubmit: (params: {
    readonly item: Omitted<InventoryItem, 'id'>;
  }) => void;
  readonly onCancelEdit: () => void;
}

interface InventoryItemDetailsFormState {
  readonly todo: 'remove';
}

// TODO: finish alternates
// TODO: unique tags validation
export class StyledInventoryItemDetailsForm extends React.Component<
  StyledTranslatedInventoryItemDetailsFormProps,
  InventoryItemDetailsFormState
> {
  public render(): JSX.Element {
    const {
      classes,
      intl,
      item,
      itemUnits,
      isInEditMode,
      onSubmit,
      onCancelEdit,
      tagSuggestions,
      alternatesSuggestions,
    } = this.props;
    const { id: idToRemove, ...initialFormValues } = item || {
      id: undefined,
      tags: undefined,
      name: '',
      unit: '' as '',
      alternates: undefined,
    };
    const nameFieldName = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label',
    });
    const tagsFieldName = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label',
    });
    const alternatesFieldName = intl.formatMessage({
      id:
        'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label',
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
      tags: yup.array(
        yup
          .string()
          .min(
            3,
            intl.formatMessage(
              { id: 'common.validationErrorMessage.stringMin' },
              { fieldName: tagsFieldName },
            ),
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
        onSubmit={(
          values: InventoryItemDetailsFormValues,
          actions: FormikActions<InventoryItemDetailsFormValues>,
        ) => {
          // Casting type due to form units allow empty values, but here it can be only not empty because of validation
          onSubmit({ item: values as Omitted<InventoryItem, 'id'> });
          actions.setSubmitting(false);
        }}
        render={({
          submitForm,
          resetForm,
          isValid,
        }: FormikProps<InventoryItemDetailsFormValues>) => (
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
                <Field
                  name="tags"
                  component={AutocompleteControl}
                  isDisabled={!isInEditMode}
                  isMulti={true}
                  allowCreate={true}
                  label={tagsFieldName}
                  options={tagSuggestions}
                />
              </Grid>

              {/* Alternates */}
              <Grid item xs={12}>
                <Field
                  name="alternates"
                  component={AutocompleteControl}
                  isDisabled={!isInEditMode}
                  isMulti={true}
                  allowCreate={false}
                  label={alternatesFieldName}
                  options={alternatesSuggestions}
                />
              </Grid>

              {isInEditMode && (
                <Grid item xs={12} className={classes.buttonsRow}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      resetForm();
                      onCancelEdit();
                    }}
                  >
                    <FormattedMessage id="common.cancelButtonLabel" />
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isInEditMode || !isValid}
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

function AutocompleteControl({
  field,
  form,
  ...props
}: FieldProps & AutocompleteProps): JSX.Element {
  const handleChange = (value: string | Array<string>) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <Autocomplete value={field.value} onChange={handleChange} {...props} />
  );
}

const inventoryItemDetailsFormStyles = ({ spacing }: Theme) =>
  createStyles({
    buttonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tagChip: {
      marginRight: spacing.unit,
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

/**
 * Formik typings.
 */
type InventoryItemDetailsFormValues = Omitted<InventoryItem, 'id' | 'unit'> & {
  readonly unit: InventoryItem['unit'] | '';
};

export type InventoryItemsAlternatesSuggestions = {
  readonly [key in InventoryItemUnits]: Array<InventoryItem['unit']>
};
