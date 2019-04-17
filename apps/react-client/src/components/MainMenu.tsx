import * as React from 'react';
import { AppRouePaths } from './app-routes';
import { createLinkComponent } from '../shared/helpers/create-link-component';
import { Dashboard, Group, ShoppingCart } from '@material-ui/icons';
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
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@material-ui/core';

export interface MainMenuProps {
  readonly mobileOpened: boolean;
  readonly isInventoryEnabled: boolean;
  readonly isEmployeesEnabled: boolean;
  readonly onClose: () => void;
}

export const StyledMainMenu: React.FunctionComponent<
  StyledMainMenuProps
> = props => {
  const {
    mobileOpened,
    isInventoryEnabled,
    isEmployeesEnabled,
    onClose,
    classes,
    theme,
  } = props;
  const dashboardMenuContent = (
    <React.Fragment>
      <List>
        <ListItem
          button
          component={createLinkComponent(AppRouePaths.dashboard)}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="dashboardPage.title" />
          </ListItemText>
        </ListItem>
      </List>

      <Divider />
    </React.Fragment>
  );
  const inventoryMenuContent = isInventoryEnabled && (
    <React.Fragment>
      <List>
        <MainMenuGroup
          textId="mainMenu.InventoryMenuItem.text"
          icon={<ShoppingCart />}
          subItems={[
            {
              textId: 'mainMenu.InventoryCatalogMenuItem.text',
              linkPath: AppRouePaths.inventoryCatalog,
            },
          ]}
        />
      </List>
      <Divider />
    </React.Fragment>
  );
  const employeesMenuContent = isEmployeesEnabled && (
    <React.Fragment>
      <List>
        <MainMenuGroup
          textId="mainMenu.EmployeesMenuItem.text"
          icon={<Group />}
          subItems={[
            {
              textId: 'mainMenu.EmployeesInvitationMenuItem.text',
              linkPath: AppRouePaths.employeeInvitation,
            },
          ]}
        />
      </List>
      <Divider />
    </React.Fragment>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />

      {dashboardMenuContent}

      {inventoryMenuContent}

      {employeesMenuContent}
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

const mainMenuStyles = ({ breakpoints, mixins }: Theme) =>
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
  React.memo(StyledMainMenu),
);
