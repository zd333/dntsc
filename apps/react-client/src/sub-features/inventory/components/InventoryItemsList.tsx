import * as React from 'react';
import { Edit } from '@material-ui/icons';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { Omitted } from '../../../shared/types/omitted.type';
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
  readonly items: Array<InventoryItem>;
  readonly idOfSelectedItem: InventoryItem['id'] | undefined;
  readonly updateIsAllowed: boolean;
  readonly onSelect: (params: {
    readonly idOfItemToSelect: InventoryItem['id'];
  }) => void;
  readonly onUpdateClick: (params: {
    readonly idOfUpdateClickedItem: InventoryItem['id'];
  }) => void;
}

const StyledInventoryItemsList: React.SFC<
  StyledInventoryItemsListProps
> = props => {
  const {
    classes,
    items,
    updateIsAllowed,
    idOfSelectedItem,
    onSelect,
    onUpdateClick,
  } = props;
  const handleItemSelect = (idOfItemToSelect: InventoryItem['id']) => {
    onSelect({ idOfItemToSelect });
  };
  const handleUpdateClick = (idOfUpdateClickedItem: InventoryItem['id']) => {
    if (updateIsAllowed) {
      onUpdateClick({ idOfUpdateClickedItem });
    }
  };

  return (
    <List className={classes.root}>
      {(items || []).map((item, index) => (
        <ListItem
          key={item.id}
          selected={item.id === idOfSelectedItem}
          dense
          button
          onClick={() => handleItemSelect(item.id)}
        >
          <ListItemText primary={item.name} />
          {updateIsAllowed && (
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Edit"
                onClick={() => handleUpdateClick(item.id)}
              >
                <Edit />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
};

const inventoryItemsListStyles = ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: palette.background.paper,
    },
  });

type StyledInventoryItemsListProps = InventoryItemsListProps &
  WithStyles<typeof inventoryItemsListStyles>;

export const InventoryItemsList = withStyles(inventoryItemsListStyles)(
  StyledInventoryItemsList,
);

/**
 * View model.
 */
export type InventoryItem = Omitted<
  InventoryItemDetailsOutDto,
  'alternates'
> & { readonly alternates?: Array<Pick<InventoryItem, 'id' | 'name'>> };
