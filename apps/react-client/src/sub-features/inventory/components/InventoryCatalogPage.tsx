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
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
} from '@material-ui/core';

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
    readonly item: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }) => {
    const selectedItem = this.getSelectedItem();

    if (
      !this.props.updateAndCreateAreAllowed ||
      !selectedItem ||
      !this.state.selectedItemIsInEditMode
    ) {
      return;
    }
    this.props.onUpdate({
      id: selectedItem.id,
      updatedItem: params.item,
    });
    this.setState({
      selectedItemIsInEditMode: false,
    });
  };

  public handleCreateNewItemSubmit = (params: {
    readonly item: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  }) => {
    if (!this.props.updateAndCreateAreAllowed) {
      return;
    }

    this.props.onCreate({
      newItem: params.item,
    });
    this.setState({
      addNewItemModalIsOpened: false,
    });
  };

  public handleCancelEditMode = () => {
    this.setState({
      selectedItemIsInEditMode: false,
    });
  };

  public handleSearchInputChange = (
    event: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!event || !event.currentTarget || !event.currentTarget.value) {
      return;
    }
    const searchString =
      event.currentTarget.value.length >= 3 ? event.currentTarget.value : '';

    this.props.onSearch({ searchString });
  };

  public handleAddNewItemButtonClick = () => {
    this.setState({
      addNewItemModalIsOpened: true,
    });
  };

  public handleCancelAddNewItemButtonClick = () => {
    this.setState({
      addNewItemModalIsOpened: false,
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
              onClick={this.handleAddNewItemButtonClick}
            >
              <FormattedMessage id="inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label" />
            </Button>
          )}
          <TextField
            label={searchControlLabel}
            fullWidth={true}
            variant="outlined"
            onChange={this.handleSearchInputChange}
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
            <Card>
              <CardContent>
                <InventoryItemDetailsForm
                  item={this.getSelectedItem()}
                  itemUnits={itemUnits}
                  isInEditMode={this.state.selectedItemIsInEditMode}
                  onSubmit={this.handleUpdateItemSubmit}
                  onCancelEdit={this.handleCancelEditMode}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog
          open={this.state.addNewItemModalIsOpened}
          aria-labelledby="add-new-inventory-item-dialog-title"
          onClose={this.handleCancelAddNewItemButtonClick}
        >
          <DialogTitle id="add-new-inventory-item-dialog-title">
            <FormattedMessage id="inventoryCatalogPage.addNewInventoryItemDialog.title" />
          </DialogTitle>
          <DialogContent>
            <InventoryItemDetailsForm
              item={undefined}
              itemUnits={itemUnits}
              isInEditMode={true}
              onSubmit={this.handleCreateNewItemSubmit}
              onCancelEdit={this.handleCancelAddNewItemButtonClick}
            />
          </DialogContent>
        </Dialog>
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
