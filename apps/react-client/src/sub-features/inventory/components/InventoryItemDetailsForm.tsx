import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItem } from './InventoryItemsList';
import { TextField } from 'formik-material-ui';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Button,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';

export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly isInEditMode: boolean;
  readonly editModeIsAllowed: boolean;
  readonly onSubmit: (params: {
    readonly updatedItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }) => void;
}

/**
 * For now alternates are not supported.
 * Add those when they are needed.
 */
// TODO: finish
const StyledInventoryItemDetailsForm: React.SFC<
  StyledTranslatedInventoryItemDetailsFormProps
> = props => {
  const { intl, item, itemUnits, editModeIsAllowed, isInEditMode } = props;
  const initialValues = item
    ? item
    : {
        name: '',
        unit: itemUnits && itemUnits.length && itemUnits[0].unitValue,
        alternates: [],
      };
  const nameControlLabel = intl.formatMessage({
    id: 'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label',
  });
  const unitsControlLabel = intl.formatMessage({
    id: 'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label',
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
          onSubmit={() => void 0}
          render={({ submitForm, isSubmitting, values, setFieldValue }) => (
            <Form>
              <Field
                name="name"
                type="text"
                disabled={!isInEditMode}
                label={nameControlLabel}
                component={TextField}
              />
              <br />

              <Field
                type="text"
                name="unit"
                label={unitsControlLabel}
                select
                helperText={unitsControlLabel}
                margin="normal"
                component={TextField}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {unitOptions}
              </Field>

              <br />

              {editModeIsAllowed && isInEditMode && (
                <Button
                  variant="raised"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  TODO Submit
                </Button>
              )}
            </Form>
          )}
        />
      </CardContent>
    </Card>
  );
};

const inventoryItemDetailsFormStyles = ({ palette }: Theme) =>
  createStyles({
    todo: {
      backgroundColor: palette.background.paper,
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
