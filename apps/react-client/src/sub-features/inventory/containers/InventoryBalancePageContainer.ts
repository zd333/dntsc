import { connect } from 'react-redux';
import { InventoryActions } from '../actions/inventory.actions';
import { RootState } from '../../..';
import { selectItemsToShow } from '../selectors/items-to-show.selector';
import { selectTranslatedInventoryItemUnits } from '../selectors/translated-inventory-item-units.selector';
import { selectUsedInventoryItemsTags } from '../selectors/used-inventory-items-tags.selector';
import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../../../shared/types/container-state-mapper.interface';
import {
  InventoryBalancePageProps,
  InventoryBalancePage,
} from '../components/InventoryBalancePage';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  InventoryBalancePageProps,
  RootState
> = state => {
  return {
    items: selectItemsToShow(state),
    itemUnits: selectTranslatedInventoryItemUnits(state),
    existingTags: selectUsedInventoryItemsTags(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  InventoryBalancePageProps
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
    onCreateBalanceChange: params =>
      dispatch(
        InventoryActions.changeItemBalanceStart({
          id: params.itemId,
          balanceChangeValue: params.balanceChangeValue,
          comment: params.balanceChangeComment,
        }),
      ),
  };
};

export const InventoryBalancePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryBalancePage);
