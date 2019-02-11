import * as React from 'react';
import { createLinkComponent } from '../shared/helpers/create-link-component';
import { Dashboard, ShoppingCart } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import { MAIN_MENU_WIDTH } from './Shell';
import { MainMenuGroup } from './MainMenuGroup';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Hidden,
  Drawer,
  Divider,
  // List,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@material-ui/core';

export interface MainMenuProps {
  readonly mobileOpened: boolean;
  readonly isInventoryEnabled: boolean;
  readonly onClose: () => void;
}

export const StyledMainMenu: React.SFC<StyledMainMenuProps> = props => {
  const { mobileOpened, isInventoryEnabled, onClose, classes, theme } = props;
  const dashboardMenuItem = (
    <List>
      <ListItem button component={createLinkComponent('/dashboard')}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText>
          <FormattedMessage id="dashboardPage.title" />
        </ListItemText>
      </ListItem>
    </List>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      {dashboardMenuItem}

      <Divider />

      {/* Inventory */}
      <List>
        {isInventoryEnabled && (
          <MainMenuGroup
            textId="mainMenu.InventoryMenuItem.text"
            icon={<ShoppingCart />}
            subItems={[
              {
                textId: 'mainMenu.InventoryBalanceMenuItem.text',
                linkPath: '/inventory/balance',
              },
            ]}
          />
        )}
      </List>

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
};

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
  });

type StyledMainMenuProps = MainMenuProps &
  WithStyles<typeof mainMenuStyles, true>;

export const MainMenu = withStyles(mainMenuStyles, { withTheme: true })(
  StyledMainMenu,
);
