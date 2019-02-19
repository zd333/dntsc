import * as React from 'react';
import { InventoryItem, InventoryItemsList } from './InventoryItemsList';
import { InventoryItemDetailsForm } from './InventoryItemDetailsForm';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

export interface InventoryCatalogPageProps {
  readonly items: Array<InventoryItem>;
  readonly updateAndCreateAreAllowed: boolean;
  readonly onCreate: (params: { readonly newItem: InventoryItem }) => void;
  readonly onUpdate: (params: {
    readonly id: InventoryItem['id'];
    readonly updatedItem: InventoryItem;
  }) => void;
}

interface InventoryCatalogPageState {
  readonly idOfSelectedItem: InventoryItem['id'] | undefined;
  readonly selectedItemIsInEditMode: boolean;
  readonly addNewItemModalIsOpened: boolean;
}

export class StyledInventoryCatalogPage extends React.Component<
  StyledInventoryCatalogProps,
  InventoryCatalogPageState
> {
  public state = {
    idOfSelectedItem: undefined,
    selectedItemIsInEditMode: false,
    addNewItemModalIsOpened: false,
  };

  public handleItemSelect = (params: {
    readonly idOfItemToSelect: InventoryItem['id'];
  }) => {
    if (this.state.selectedItemIsInEditMode) {
      // Do not allow switching to another item when in edit mode
      return;
    }
    this.setState({
      idOfSelectedItem: params.idOfItemToSelect,
    });
  };

  public handleItemStartUpdateModeClick = (params: {
    readonly idOfUpdateClickedItem: InventoryItem['id'];
  }) => {
    if (this.state.selectedItemIsInEditMode) {
      // Do not allow switching to another item when in edit mode
      return;
    }
    this.setState({
      idOfSelectedItem: params.idOfUpdateClickedItem,
      selectedItemIsInEditMode: true,
    });
  };

  public render(): JSX.Element {
    const { items, updateAndCreateAreAllowed } = this.props;
    const { idOfSelectedItem } = this.state;

    // TODO: make it column on mobile (item details on top, items list below)
    return (
      <Grid container spacing={24}>
        <Grid item sm={12} md={6}>
          <InventoryItemsList
            items={items}
            idOfSelectedItem={idOfSelectedItem}
            updateIsAllowed={updateAndCreateAreAllowed}
            onSelect={this.handleItemSelect}
            onUpdateClick={this.handleItemStartUpdateModeClick}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          {/* TODO: bind props */}
          <InventoryItemDetailsForm item={undefined}=/>
        </Grid>
      </Grid>
    );
  }
}

const inventoryCatalogPageStyles = ({ palette, spacing }: Theme) =>
  createStyles({});

type StyledInventoryCatalogProps = InventoryCatalogPageProps &
  WithStyles<typeof inventoryCatalogPageStyles>;

export const InventoryCatalogPage = withStyles(inventoryCatalogPageStyles)(
  StyledInventoryCatalogPage,
);
