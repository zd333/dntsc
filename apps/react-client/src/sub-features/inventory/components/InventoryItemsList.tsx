import * as React from 'react';
import { Edit } from '@material-ui/icons';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
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
  readonly items: Array<InventoryItemVM>;
  readonly idOfSelectedItem: InventoryItemVM['id'] | undefined;
  readonly updateIsAllowed?: boolean;
  readonly onSelect: (params: {
    readonly idOfItemToSelect: InventoryItemVM['id'];
  }) => void;
  readonly onUpdateClick: (params: {
    readonly idOfUpdateClickedItem: InventoryItemVM['id'];
  }) => void;
}

const StyledInventoryItemsList: React.FunctionComponent<
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
  const handleItemSelect = (idOfItemToSelect: InventoryItemVM['id']) => {
    onSelect({ idOfItemToSelect });
  };
  const handleUpdateClick = (idOfUpdateClickedItem: InventoryItemVM['id']) => {
    if (updateIsAllowed) {
      onUpdateClick({ idOfUpdateClickedItem });
    }
  };

  return (
    <List className={classes.root}>
      {(items || []).map(item => (
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

export const InventoryItemsList = React.memo(
  withStyles(inventoryItemsListStyles)(StyledInventoryItemsList),
);
