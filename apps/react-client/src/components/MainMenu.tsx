import * as React from 'react';
import { ExpandLess, ExpandMore, ShoppingCart } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import { Link, LinkProps } from 'react-router-dom';
import { MAIN_MENU_WIDTH } from './Shell';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core';

export interface MainMenuProps {
  readonly mobileOpened: boolean;
  readonly isInventoryEnabled: boolean;
  readonly onClose: () => void;
}

interface MainMenuState {
  readonly inventorySectionOpened: boolean;
}

export class StyledMainMenu extends React.Component<
  StyledMainMenuProps,
  MainMenuState
> {
  public state = {
    inventorySectionOpened: false,
  };

  public render(): JSX.Element {
    const {
      mobileOpened,
      isInventoryEnabled,
      onClose,
      classes,
      theme,
    } = this.props;
    const createLinkComponent = (to: string) => (linkProps: LinkProps) => (
      <Link to={to} {...linkProps} />
    );
    const inventoryMenuItem = (
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
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{isInventoryEnabled && inventoryMenuItem}</List>
        <Divider />
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpened}
            onClose={onClose}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const mainMenuStyles = ({ breakpoints, spacing, mixins }: Theme) =>
  createStyles({
    toolbar: mixins.toolbar,
    drawer: {
      [breakpoints.up('sm')]: {
        width: MAIN_MENU_WIDTH,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: MAIN_MENU_WIDTH,
    },
    nested: {
      paddingLeft: spacing.unit * 4,
    },
  });

type StyledMainMenuProps = MainMenuProps &
  WithStyles<typeof mainMenuStyles, true>;

export const MainMenu = withStyles(mainMenuStyles, { withTheme: true })(
  StyledMainMenu,
);
