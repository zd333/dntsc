import { connect } from 'react-redux';
import { InventoryActions } from '../actions/inventory.actions';
import { RootState } from '../../..';
import { selectItemsToShow } from '../selectors/items-to-show.selector';
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
    // TODO: implement
    onCreateBalanceChange: () => void 0,
  };
};

export const InventoryBalancePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryBalancePage);
