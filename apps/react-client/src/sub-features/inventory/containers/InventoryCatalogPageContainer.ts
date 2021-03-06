import { connect } from 'react-redux';
import { InventoryActions } from '../actions/inventory.actions';
import { RootState } from '../../..';
import { selectAlternatesSuggestions } from '../selectors/alternates-suggestions.selector';
import { selectItemsToShow } from '../selectors/items-to-show.selector';
import { selectTranslatedInventoryItemUnits } from '../selectors/translated-inventory-item-units.selector';
import { selectUpdateAndCreateInventoryItemsIsAllowed } from '../selectors/update-and-create-inventory-items-is-allowed.selector';
import { selectUsedInventoryItemsTags } from '../selectors/used-inventory-items-tags.selector';
import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../../../shared/types/container-state-mapper.interface';
import {
  InventoryCatalogPageProps,
  InventoryCatalogPage,
} from '../components/InventoryCatalogPage';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  InventoryCatalogPageProps,
  RootState
> = state => {
  return {
    items: selectItemsToShow(state),
    itemUnits: selectTranslatedInventoryItemUnits(state),
    alternatesSuggestions: selectAlternatesSuggestions(state),
    updateAndCreateAreAllowed: selectUpdateAndCreateInventoryItemsIsAllowed(
      state,
    ),
    existingTags: selectUsedInventoryItemsTags(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  InventoryCatalogPageProps
> = dispatch => {
  return {
    onSearch: params => {
      dispatch(
        InventoryActions.fetchAndFilterItemsStart({
          searchString: params.searchString,
          tagsToFilterBy: params.tagsToFilterBy,
        }),
      );
    },
    onCreate: params => {
      dispatch(
        InventoryActions.createItemStart({ newItemData: params.newItemData }),
      );
    },
    onUpdate: params => {
      const { id, itemUpdates } = params;
      dispatch(InventoryActions.updateItemStart({ id, itemUpdates }));
    },
    onNeedAlternatesForGivenUnit: params => {
      const { unit } = params;
      dispatch(InventoryActions.fetchItemsStart({ unitToFilterBy: unit }));
    },
  };
};

export const InventoryCatalogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryCatalogPage);
