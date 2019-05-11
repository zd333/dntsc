import { closeErrorNotificationModalAction } from '../actions/error-modal.actions';
import { connect } from 'react-redux';
import { ErrorModal, ErrorModalProps } from '../components/ErrorModal';
import { RootState } from '../../src';
import { selectErrorModalIsShown } from '../selectors/error-modal-is-shown.selector';
import { selectErrorModalMessage } from '../selectors/error-modal-message.selector';
import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  ErrorModalProps,
  RootState
> = state => {
  return {
    isOpened: selectErrorModalIsShown(state),
    message: selectErrorModalMessage(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  ErrorModalProps
> = dispatch => {
  return {
    onClose: () => {
      dispatch(closeErrorNotificationModalAction());
    },
  };
};

export const ErrorModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorModal);
