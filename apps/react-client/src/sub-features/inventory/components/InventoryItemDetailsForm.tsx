import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItem } from './InventoryItemsList';
import { Select, TextField } from 'formik-material-ui';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid,
  InputLabel,
  FormControl,
} from '@material-ui/core';

export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly isInEditMode: boolean;
  readonly onSubmit: (params: {
    readonly updatedItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
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
        unit: itemUnits[0].unitValue,
        alternates: [],
      };
  const nameControlLabel = intl.formatMessage({
    id: 'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label',
  });
  const unitOptions = (itemUnits || []).map(unit => (
    <MenuItem key={unit.unitValue} value={unit.unitValue}>
      {unit.unitLabelShort}
    </MenuItem>
  ));

  return (
    <Card>
      <CardContent>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onSubmit({
              updatedItem: values,
            });
            actions.setSubmitting(false);
          }}
          render={({ submitForm, resetForm, isValid }) => (
            <Form>
              <Grid container spacing={24}>
                <Grid item sm={12}>
                  <Field
                    name="name"
                    disabled={!isInEditMode}
                    label={nameControlLabel}
                    component={TextField}
                  />
                </Grid>

                <Grid item sm={12}>
                  <FormControl>
                    <InputLabel shrink htmlFor="inventory-item-units-label">
                      <FormattedMessage id="inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label" />
                    </InputLabel>
                    <Field
                      component={Select}
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
                  <Grid item sm={12} className={classes.buttonsRow}>
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
      </CardContent>
    </Card>
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
