import * as React from 'react';
import { Edit } from '@material-ui/icons';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

export interface InventoryItemsListProps {
  readonly items: Array<InventoryItemDetailsOutDto>;
  readonly indexOfSelectedItem: number | undefined;
  readonly onSelect: (params: { readonly indexOfItemToSelect: number }) => void;
  readonly onUpdateClick: (params: {
    readonly indexOfUpdateClickedItem: number;
  }) => void;
}

const StyledInventoryItemsList: React.SFC<
  StyledInventoryItemsListProps
> = props => {
  const { classes, items, onSelect, onUpdateClick } = props;
  const handleItemSelect = (indexOfItemToSelect: number) => {
    if (typeof onSelect === 'function') {
      onSelect({ indexOfItemToSelect });
    }
  };
  const handleUpdateClick = (indexOfUpdateClickedItem: number) => {
    if (typeof onUpdateClick === 'function') {
      onUpdateClick({ indexOfUpdateClickedItem });
    }
  };

  return (
    <List className={classes.root}>
      {(items || []).map((item, index) => (
        <ListItem
          key={item.id}
          dense
          button
          // Non-lambda implementation not worth the performance benefit
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => handleItemSelect(index)}
        >
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit"
              // Non-lambda implementation not worth the performance benefit
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => handleUpdateClick(index)}
            >
              <Edit />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const inventoryItemsListStyles = ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: palette.background.paper,
    },
  });

type StyledInventoryItemsListProps = InventoryItemsListProps &
  WithStyles<typeof inventoryItemsListStyles>;

export const InventoryItemsList = withStyles(inventoryItemsListStyles)(
  StyledInventoryItemsList,
);
