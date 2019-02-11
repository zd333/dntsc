import * as React from 'react';
import { createLinkComponent } from '../shared/helpers/create-link-component';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@material-ui/core';

export interface MainMenuGroupProps {
  /**
   * Id (key) of main group item text in intl (translations) dictionary.
   */
  readonly textId: string;
  readonly icon?: JSX.Element;
  readonly subItems: Array<{
    readonly textId: string;
    readonly linkPath: string;
  }>;
}

interface MainMenuGroupState {
  readonly isOpened: boolean;
}

class StyledMainMenuGroup extends React.Component<
  StyledMainMenuGroupProps,
  MainMenuGroupState
> {
  public state = {
    isOpened: false,
  };

  public toggleMenu = () => {
    this.setState((previousState: MainMenuGroupState) => ({
      isOpened: !previousState.isOpened,
    }));
  };

  public render(): JSX.Element {
    const { textId, classes, icon, subItems } = this.props;

    if (!Array.isArray(subItems) || subItems.length === 0) {
      // Just placeholder (null doesn't work for TS)
      return <div />;
    }

    if (subItems.length === 1) {
      // Makes no sense to render expandable group - render single menu item
      return (
        <ListItem button component={createLinkComponent(subItems[0].linkPath)}>
          {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText>
            <FormattedMessage id={textId} />
            -
            <FormattedMessage id={subItems[0].textId} />
          </ListItemText>
        </ListItem>
      );
    }

    const subitemElements = subItems.map(subItem => (
      <ListItem
        key={subItem.textId}
        component={createLinkComponent(subItem.linkPath)}
        className={classes.nested}
        button
      >
        <ListItemText>
          <FormattedMessage id={subItem.textId} />
        </ListItemText>
      </ListItem>
    ));

    return (
      <React.Fragment>
        <ListItem button onClick={this.toggleMenu}>
          {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText>
            <FormattedMessage id={textId} />
          </ListItemText>
          {this.state.isOpened ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.isOpened} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subitemElements}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

const mainMenuGroupStyles = ({ palette, spacing, shadows }: Theme) =>
  createStyles({
    nested: {
      paddingLeft: spacing.unit * 4,
    },
  });

type StyledMainMenuGroupProps = MainMenuGroupProps &
  WithStyles<typeof mainMenuGroupStyles>;

export const MainMenuGroup = withStyles(mainMenuGroupStyles)(
  StyledMainMenuGroup,
);
