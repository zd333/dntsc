import { connect } from 'react-redux';
import { InventoryActions } from '../actions/inventory.actions';
import { RootState } from '../../..';
import { selectMatchingSearchItems } from '../selectors/matching-search-items.selector';
import { selectTranslatedInventoryItemUnits } from '../selectors/translated-inventory-item-units.selector';
import { selectUpdateAndCreateInventoryItemsIsAllowed } from '../selectors/update-and-create-inventory-items-is-allowed.selector';
import {
  InventoryCatalogPageProps,
  InventoryCatalogPage,
} from '../components/InventoryCatalogPage';
import {
  DispatchMapper,
  StateMapper,
} from '../../../shared/interfaces/container-state-mapper.interface';

const mapStateToProps: StateMapper<
  InventoryCatalogPageProps,
  RootState
> = state => {
  return {
    items: selectMatchingSearchItems(state),
    itemUnits: selectTranslatedInventoryItemUnits(state),
    updateAndCreateAreAllowed: selectUpdateAndCreateInventoryItemsIsAllowed(
      state,
    ),
  };
};

const mapDispatchToProps: DispatchMapper<
  InventoryCatalogPageProps
> = dispatch => {
  return {
    // TODO: finish
    onSearch: params => {
      dispatch(
        InventoryActions.searchItemsStart({
          searchString: params.searchString,
        }),
      );
    },
    onCreate: params => {
      dispatch(InventoryActions.createItemStart({ item: params.newItem }));
    },
  };
};

export const InventoryCatalogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryCatalogPage);
