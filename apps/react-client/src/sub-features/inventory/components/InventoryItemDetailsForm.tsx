import * as React from 'react';
import * as yup from 'yup';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { Omitted } from '../../../shared/types/omitted.type';
import { Select, TextField } from 'formik-material-ui';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  allInventoryItemUnits,
  InventoryItem,
} from '../selectors/items-dictionary.selector';
import {
  Field,
  Form,
  Formik,
  FormikActions,
  FormikProps,
  FieldProps,
} from 'formik';
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
  readonly alternatesSuggestions: {
    readonly [key in InventoryItemUnits]: Array<
      Pick<InventoryItem, 'id' | 'name'>
    >
  };
  readonly isInEditMode: boolean;
  readonly onSubmit: (params: {
    readonly item: Omitted<InventoryItem, 'id'>;
  }) => void;
  readonly onCancelEdit: () => void;
}

interface InventoryItemDetailsFormState {
  readonly todo: 'remove';
}

// TODO: implement filter by alternates API support (+ filter by tags)
// TODO: and then dispatch search action after each select of unit with selected unit
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
    const getAlternatesSuggestionsForGivenUnit = (
      unit: InventoryItemDetailsFormValues['unit'],
      item: InventoryItem | undefined,
    ): Array<Pick<InventoryItem, 'id' | 'name'>> | undefined => {
      if (
        !unit ||
        !alternatesSuggestions ||
        !Array.isArray(alternatesSuggestions[unit])
      ) {
        return undefined;
      }

      // Filter items with own id (if any)
      return item && item.id
        ? alternatesSuggestions[unit].filter(
            suggestion => suggestion.id !== item.id,
          )
        : alternatesSuggestions[unit];
    };

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
          values,
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
                  getDisplayValue={(s: Pick<InventoryItem, 'id' | 'name'>) =>
                    s.name
                  }
                  getUniqueId={(s: Pick<InventoryItem, 'id' | 'name'>) => s.id}
                  isDisabled={!isInEditMode || !values.unit}
                  isMulti={true}
                  allowCreate={false}
                  label={alternatesFieldName}
                  options={getAlternatesSuggestionsForGivenUnit(
                    values.unit,
                    item,
                  )}
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

/**
 * New item creation will work only with string items with this generic implementation.
 * It is fine for tags (which are strings) and alternates (which do not support new items),
 * but beware of using it as is in other cases.
 */
function AutocompleteControl<T>({
  field,
  form,
  ...props
}: FieldProps & AutocompleteProps<T>): JSX.Element {
  const newItemCreator = (newValue: string) => newValue;
  const handleChange = (values: Array<T>) => {
    form.setFieldValue(field.name, values);
  };

  return (
    <Autocomplete
      {...props}
      value={field.value}
      onChange={handleChange}
      newItemCreator={props.allowCreate ? newItemCreator : undefined}
    />
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
