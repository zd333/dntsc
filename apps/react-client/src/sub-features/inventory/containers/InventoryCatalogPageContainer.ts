import { connect } from 'react-redux';
import { RootState } from '../../..';
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
    // TODO: implement
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
