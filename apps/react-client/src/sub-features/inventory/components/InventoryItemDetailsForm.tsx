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
} from '@material-ui/core';

export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly isInEditMode: boolean;
  readonly onSubmit: (params: {
    readonly item: Omitted<InventoryItem, 'id'>;
  }) => void;
  readonly onCancelEdit: () => void;
}

// TODO: implement alternates
/**
 * For now alternates are not supported.
 * Add those when they are needed.
 */
const StyledInventoryItemDetailsForm: React.SFC<
  StyledTranslatedInventoryItemDetailsFormProps
> = props => {
  const {
    classes,
    intl,
    item,
    itemUnits,
    isInEditMode,
    onSubmit,
    onCancelEdit,
  } = props;
  const initialValues = item
    ? item
    : {
        name: '',
        unit: '',
        alternates: [],
      };
  const nameFieldName = intl.formatMessage({
    id: 'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label',
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit({
          item: values as InventoryItem,
        });
        actions.setSubmitting(false);
      }}
      render={({ submitForm, resetForm, isValid }) => (
        <Form>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="name"
                disabled={!isInEditMode}
                label={nameFieldName}
                fullWidth={true}
              />
            </Grid>

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
};

const inventoryItemDetailsFormStyles = () =>
  createStyles({
    buttonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
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
