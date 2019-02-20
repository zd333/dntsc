import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import { InventoryItem } from './InventoryItemsList';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  TextField,
  Button,
  MenuItem,
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
  StyledInventoryItemDetailsFormProps
> = props => {
  const { item, itemUnits, editModeIsAllowed, isInEditMode } = props;
  const initialValues = item
    ? item
    : {
        name: 'XXX',
        unit: itemUnits && itemUnits.length && itemUnits[0].unitValue,
        alternates: [],
      };
  const unitOptions = (itemUnits || []).map(unit => (
    <MenuItem key={unit.unitValue} value={unit.unitValue}>
      {unit.unitLabelShort}
    </MenuItem>
  ));
  console.log(item);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => void 0}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Field name="name" type="text" label="TODO" component={TextField} />
          <br />
          <Field
            type="text"
            name="unit"
            label="TODO"
            select
            helperText="TODO"
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
  );
};

const inventoryItemDetailsFormStyles = ({ palette }: Theme) =>
  createStyles({
    todo: {
      backgroundColor: palette.background.paper,
    },
  });

type StyledInventoryItemDetailsFormProps = InventoryItemDetailsFormProps &
  WithStyles<typeof inventoryItemDetailsFormStyles>;

export const InventoryItemDetailsForm = withStyles(
  inventoryItemDetailsFormStyles,
)(StyledInventoryItemDetailsForm);
