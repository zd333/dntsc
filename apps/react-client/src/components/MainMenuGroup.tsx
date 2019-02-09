import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import {
  Typography,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Modal,
  ListItem,
} from '@material-ui/core';

export interface MainMenuGroupProps {
  /**
   * Id (key) of main group item text in intl (translations) dictionary.
   */
  readonly textId: boolean;
  readonly icon?: React.ComponentType<SvgIconProps>;
}

interface MainMenuState {
  isOpened: boolean;
}

class StyledMainMenuGroup extends React.Component<
  StyledMainMenuGroupProps,
  MainMenuState
> {
  public state = {
    isOpened: false,
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="mainMenu.InventoryMenuItem.text" />
          </ListItemText>
          {this.state.inventorySectionOpened ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.inventorySectionOpened}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem
              component={createLinkComponent('/inventory/balance')}
              className={classes.nested}
              button
            >
              <ListItemText>
                <FormattedMessage id="mainMenu.InventoryBalanceMenuItem.text" />
              </ListItemText>
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

const mainMenuGroupStyles = ({ palette, spacing, shadows }: Theme) =>
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

type StyledMainMenuGroupProps = MainMenuGroupProps &
  WithStyles<typeof mainMenuGroupStyles>;

export const MainMenuGroup = withStyles(mainMenuGroupStyles)(
  StyledMainMenuGroup,
);
