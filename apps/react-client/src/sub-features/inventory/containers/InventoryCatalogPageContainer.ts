import { connect } from 'react-redux';
import { RootState } from '../../..';
import { selectAllInventoryItems } from '../selectors/all-inventory-items.selector';
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
    // TODO: finish
    items: selectAllInventoryItems(state),
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
    // TODO: implement
  };
};

export const InventoryCatalogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryCatalogPage);
