import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItem, InventoryItemsList } from './InventoryItemsList';
import { InventoryItemDetailsForm } from './InventoryItemDetailsForm';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Button,
  TextField,
} from '@material-ui/core';

// TODO: implement search feature
// TODO: add new item popup component
// TODO: implement update item functionality
export interface InventoryCatalogPageProps {
  readonly items: Array<InventoryItem>;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly updateAndCreateAreAllowed: boolean;
  readonly onSearch: (params: {
    readonly searchString: string | undefined;
  }) => void;
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

  public handleUpdateItemSubmit = (params: {
    readonly updatedItem: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }) => {
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
    this.setState({
      selectedItemIsInEditMode: false,
    });
  };

  public handleCancelEditMode = () => {
    this.setState({
      selectedItemIsInEditMode: false,
    });
  };

  public getSelectedItem(): InventoryItem | undefined {
    return (
      this.props.items &&
      this.props.items.find(item => item.id === this.state.idOfSelectedItem)
    );
  }

  public render(): JSX.Element {
    const {
      intl,
      classes,
      items,
      itemUnits,
      updateAndCreateAreAllowed,
    } = this.props;
    const { idOfSelectedItem } = this.state;
    const searchControlLabel = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label',
    });

    return (
      <React.Fragment>
        <div className={classes.searchBar}>
          {updateAndCreateAreAllowed && (
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary"
              disabled={this.state.selectedItemIsInEditMode}
              // TODO: implement
              onClick={() => void 0}
            >
              <FormattedMessage id="inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label" />
            </Button>
          )}
          <TextField
            label={searchControlLabel}
            fullWidth={true}
            variant="outlined"
          />
        </div>

        <Grid container className={classes.itemsListAndDetails} spacing={8}>
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
              onSubmit={this.handleUpdateItemSubmit}
              onCancelEdit={this.handleCancelEditMode}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const inventoryCatalogPageStyles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    itemsListAndDetails: {
      [breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },
    searchBar: {
      display: 'flex',
      marginBottom: spacing.unit * 4,
    },
    addButton: {
      marginRight: spacing.unit * 2,
    },
  });

type StyledInventoryCatalogProps = InventoryCatalogPageProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryCatalogPageStyles>;

const TranslatedInventoryCatalogPage = injectIntl(StyledInventoryCatalogPage);
export const InventoryCatalogPage = withStyles(inventoryCatalogPageStyles)(
  TranslatedInventoryCatalogPage,
);
