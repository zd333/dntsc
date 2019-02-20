import * as React from 'react';
import { InventoryItem, InventoryItemsList } from './InventoryItemsList';
import { InventoryItemDetailsForm } from './InventoryItemDetailsForm';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

export interface InventoryCatalogPageProps {
  readonly items: Array<InventoryItem>;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly updateAndCreateAreAllowed: boolean;
  readonly onCreate: (params: {
    readonly newItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }) => void;
  readonly onUpdate: (params: {
    readonly id: InventoryItem['id'];
    readonly updatedItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
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

  public handleUpdateItemSubmit(params: {
    readonly updatedItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }): void {
    const selectedItem = this.getSelectedItem();

    if (
      !this.props.updateAndCreateAreAllowed ||
      !selectedItem ||
      !this.state.selectedItemIsInEditMode ||
      typeof this.props.onUpdate !== 'function'
    ) {
      return;
    }
    this.props.onUpdate({
      id: selectedItem.id,
      updatedItem: params.updatedItem,
    });
  }

  public getSelectedItem(): InventoryItem | undefined {
    return (
      this.props.items &&
      this.props.items.find(item => item.id === this.state.idOfSelectedItem)
    );
  }

  public render(): JSX.Element {
    const { items, itemUnits, updateAndCreateAreAllowed } = this.props;
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
          <InventoryItemDetailsForm
            item={this.getSelectedItem()}
            itemUnits={itemUnits}
            isInEditMode={this.state.selectedItemIsInEditMode}
            editModeIsAllowed={this.props.updateAndCreateAreAllowed}
            onSubmit={this.handleUpdateItemSubmit}
          />
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
