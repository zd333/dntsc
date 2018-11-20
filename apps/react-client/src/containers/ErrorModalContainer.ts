import { closeErrorNotificationModalAction } from 'src/actions/error-modal.actions';
import { connect } from 'react-redux';
import { ErrorModal, ErrorModalProps } from 'src/components/ErrorModal';
import { RootState } from 'src';
import { selectErrorModalIsShown } from 'src/selectors/error-modal-is-shown.selector';
import { selectErrorModalMessage } from 'src/selectors/error-modal-message.selector';
import {
  StateMapper,
  DispatchMapper,
} from 'src/shared/interfaces/container-state-mapper.interface';

const mapStateToProps: StateMapper<ErrorModalProps, RootState> = state => {
  return {
    isOpened: selectErrorModalIsShown(state),
    message: selectErrorModalMessage(state),
  };
};

const mapDispatchToProps: DispatchMapper<ErrorModalProps> = dispatch => {
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
