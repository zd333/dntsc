import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Modal,
} from '@material-ui/core';

export interface ErrorModalProps {
  readonly isOpened: boolean;
  readonly message?: string;
  readonly onClose: () => void;
}

const StyledErrorModal: React.SFC<StyledErrorModalProps> = props => {
  const { classes, isOpened, onClose, message } = props;
  const messageToShow = message || (
    <FormattedMessage id="errorModal.defaultErrorMessage" />
  );

  return (
    // TODO: refactor with Dialog component (Modal is low-level, no need to use it here)
    <Modal
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
      open={isOpened}
      onClose={onClose}
    >
      <div className={classes.paper}>
        <Typography variant="h6" id="error-modal-title">
          <FormattedMessage id="errorModal.title" />
        </Typography>
        <Typography variant="subtitle1" id="error-modal-description">
          {messageToShow}
        </Typography>
      </div>
    </Modal>
  );
};

const errorModalStyles = ({ palette, spacing, shadows }: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: spacing.unit * 50,
      backgroundColor: palette.background.paper,
      boxShadow: shadows[5],
      padding: spacing.unit * 4,
    },
  });

type StyledErrorModalProps = ErrorModalProps &
  WithStyles<typeof errorModalStyles>;

export const ErrorModal = withStyles(errorModalStyles)(StyledErrorModal);
