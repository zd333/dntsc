import * as React from 'react';
import { Autocomplete } from '../../../shared/components/Autocomplete';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItemsList } from './InventoryItemsList';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { Omitted } from '../../../shared/types/omitted.type';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  InventoryItemDetailsForm,
  InventoryItemDetailsFormProps,
} from './InventoryItemDetailsForm';
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

export interface InventoryCatalogPageProps {
  readonly items: Array<InventoryItemVM>;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly existingTags: Array<string>;
  readonly updateAndCreateAreAllowed?: boolean;
  readonly alternatesSuggestions: InventoryItemDetailsFormProps['alternatesSuggestions'];
  readonly onSearch: (params: {
    readonly searchString?: string;
    readonly tagsToFilterBy?: Array<string>;
  }) => void;
  readonly onNeedAlternatesForGivenUnit: (params: {
    readonly unit: InventoryItemVM['unit'];
  }) => void;
  readonly onCreate: (params: {
    readonly newItemData: Omitted<InventoryItemVM, 'id'>;
  }) => void;
  readonly onUpdate: (params: {
    readonly id: InventoryItemVM['id'];
    readonly itemUpdates: Omitted<InventoryItemVM, 'id'>;
  }) => void;
}

interface InventoryCatalogPageState {
  readonly idOfSelectedItem?: InventoryItemVM['id'];
  readonly selectedItemIsInEditMode: boolean;
  readonly addNewItemModalIsOpened: boolean;
  readonly currentSearchString: string;
  readonly currentTagsToFilterBy?: Array<string>;
}

// TODO: refactor with `useState` hook
export class StyledInventoryCatalogPage extends React.PureComponent<
  StyledInventoryCatalogProps,
  InventoryCatalogPageState
> {
  public state = {
    idOfSelectedItem: undefined,
    selectedItemIsInEditMode: false,
    addNewItemModalIsOpened: false,
    currentSearchString: '',
    currentTagsToFilterBy: undefined,
  };

  public handleItemSelect = (params: {
    readonly idOfItemToSelect: InventoryItemVM['id'];
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
    readonly idOfUpdateClickedItem: InventoryItemVM['id'];
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
    readonly item: Omitted<InventoryItemVM, 'id'>;
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
      itemUpdates: params.item,
    });
    this.setState({
      selectedItemIsInEditMode: false,
    });
  };

  public handleUnitChange = (params: {
    readonly unit: InventoryItemVM['unit'];
  }) => {
    this.props.onNeedAlternatesForGivenUnit(params);
  };

  public handleCreateNewItemSubmit = (params: {
    readonly item: Omitted<InventoryItemVM, 'id'>;
  }) => {
    if (!this.props.updateAndCreateAreAllowed) {
      return;
    }

    this.props.onCreate({
      newItemData: params.item,
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
    const currentSearchString =
      event &&
      event.currentTarget &&
      event.currentTarget.value &&
      event.currentTarget.value.length >= 3
        ? event.currentTarget.value
        : '';

    this.setState({
      currentSearchString,
    });

    this.props.onSearch({
      searchString: currentSearchString,
      tagsToFilterBy: this.state.currentTagsToFilterBy,
    });
  };

  public handleFilterTagsChange = (tags: Array<string>) => {
    this.setState({ currentTagsToFilterBy: tags });
    this.props.onSearch({
      searchString: this.state.currentSearchString,
      tagsToFilterBy: tags,
    });
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

  public getSelectedItem(): InventoryItemVM | undefined {
    return (
      this.props.items &&
      this.props.items.find(item => item.id === this.state.idOfSelectedItem)
    );
  }

  public getTagsSuggestionsForExistingItem(): Array<string> {
    const item = this.getSelectedItem();
    const itemTags = item && item.tags;

    return itemTags
      ? this.props.existingTags.filter(tag =>
          itemTags.every(itemTag => itemTag !== tag),
        )
      : this.props.existingTags;
  }

  public render(): JSX.Element {
    const {
      intl,
      classes,
      items,
      itemUnits,
      existingTags,
      updateAndCreateAreAllowed,
      alternatesSuggestions,
    } = this.props;
    const { idOfSelectedItem } = this.state;
    const searchControlLabel = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label',
    });
    const filterByTagsControlLabel = intl.formatMessage({
      id: 'inventoryCatalogPage.inventoryItemsList.filterByTagsControl.label',
    });

    return (
      <React.Fragment>
        {/* Search bar with add button */}
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

        {/* Filter by tags control */}
        <div className={classes.filterTagsBar}>
          <Autocomplete
            value={this.state.currentTagsToFilterBy}
            options={existingTags}
            label={filterByTagsControlLabel}
            allowCreate={false}
            isMulti={true}
            onChange={this.handleFilterTagsChange}
          />
        </div>

        {/* Items list */}
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
            <Card classes={{ root: classes.itemDetailsCardRoot }}>
              <CardContent>
                <InventoryItemDetailsForm
                  item={this.getSelectedItem()}
                  availableItemUnits={itemUnits}
                  tagSuggestions={this.getTagsSuggestionsForExistingItem()}
                  alternatesSuggestions={alternatesSuggestions}
                  isInEditMode={this.state.selectedItemIsInEditMode}
                  onSubmit={this.handleUpdateItemSubmit}
                  onUnitChange={this.handleUnitChange}
                  onCancelEdit={this.handleCancelEditMode}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog
          aria-labelledby="add-new-inventory-item-dialog-title"
          open={this.state.addNewItemModalIsOpened}
          onClose={this.handleCancelAddNewItemButtonClick}
          classes={{ paper: classes.newItemDialogPaper }}
        >
          <DialogTitle id="add-new-inventory-item-dialog-title">
            <FormattedMessage id="inventoryCatalogPage.addNewInventoryItemDialog.title" />
          </DialogTitle>
          <DialogContent classes={{ root: classes.newItemDialogContent }}>
            <InventoryItemDetailsForm
              item={undefined}
              availableItemUnits={itemUnits}
              tagSuggestions={existingTags}
              alternatesSuggestions={alternatesSuggestions}
              isInEditMode={true}
              onSubmit={this.handleCreateNewItemSubmit}
              onUnitChange={this.handleUnitChange}
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
    filterTagsBar: {
      marginBottom: spacing.unit * 4,
    },
    addButton: {
      marginRight: spacing.unit * 2,
    },
    newItemDialogPaper: {
      overflowY: 'visible',
    },
    newItemDialogContent: {
      overflowY: 'visible',
    },
    itemDetailsCardRoot: {
      overflow: 'visible',
    },
  });

type StyledInventoryCatalogProps = InventoryCatalogPageProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryCatalogPageStyles>;

const TranslatedInventoryCatalogPage = injectIntl(StyledInventoryCatalogPage);
export const InventoryCatalogPage = withStyles(inventoryCatalogPageStyles)(
  TranslatedInventoryCatalogPage,
);
