import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { InventoryItem } from './InventoryItemsList';
// TODO: finish
export interface InventoryItemDetailsFormProps {
  readonly item: InventoryItem | undefined;
  readonly isInEditMode: boolean;
  readonly editModeIsAllowed: boolean;
  readonly onSubmit: (
    params: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>,
  ) => void;
}

const StyledInventoryItemDetailsForm: React.SFC<
  StyledInventoryItemDetailsFormProps
> = props => {
  const { item } = props;

  return <div>{item}</div>;
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
