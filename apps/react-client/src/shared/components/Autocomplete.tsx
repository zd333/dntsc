import * as classNames from 'classnames';
import * as React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';
import { ControlProps } from 'react-select/lib/components/Control';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { MenuProps, NoticeProps } from 'react-select/lib/components/Menu';
import { MultiValueProps } from 'react-select/lib/components/MultiValue';
import { OptionProps } from 'react-select/lib/components/Option';
import { PlaceholderProps } from 'react-select/lib/components/Placeholder';
import { SingleValueProps } from 'react-select/lib/components/SingleValue';
import { Styles } from 'react-select/lib/styles';
import { ValueContainerProps } from 'react-select/lib/components/containers';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  TextField,
  Paper,
  Chip,
  Typography,
  MenuItem,
} from '@material-ui/core';

export interface AutocompleteProps {
  readonly options: Array<string>;
  readonly label: string;
  readonly placeholder?: string;
  readonly isDisabled?: boolean;
  readonly allowCreate?: boolean;
  readonly isMulti?: boolean;
}

function inputComponent({
  inputRef,
  ...props
}: InputBaseComponentProps): JSX.Element {
  // Too complicated for typing
  // tslint:disable-next-line:no-any
  return <div ref={inputRef} {...props as any} />;
}

function Control(props: ControlProps<AutocompleteOptionType>): JSX.Element {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Menu(props: MenuProps<AutocompleteOptionType>): JSX.Element {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

function MultiValue(
  props: MultiValueProps<AutocompleteOptionType>,
): JSX.Element {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function NoOptionsMessage(
  props: NoticeProps<AutocompleteOptionType>,
): JSX.Element {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Option(props: OptionProps<AutocompleteOptionType>): JSX.Element {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(
  props: PlaceholderProps<AutocompleteOptionType>,
): JSX.Element {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(
  props: SingleValueProps<AutocompleteOptionType>,
): JSX.Element {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(
  props: ValueContainerProps<AutocompleteOptionType>,
): JSX.Element {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

// TODO: finish
const StyledAutocomplete: React.SFC<StyledAutocompleteProps> = props => {
  const { classes, theme, isMulti, options, label, placeholder } = props;
  const selectStyles: Partial<Styles> = {
    input: (base: React.CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const getSuggestions = (): Array<AutocompleteOptionType> =>
    Array.isArray(options) ? options.map(option => ({ label: option })) : [];

  return (
    <div className={classes.root}>
      <Select
        classes={classes}
        styles={selectStyles}
        textFieldProps={{
          label,
          InputLabelProps: {
            shrink: true,
          },
        }}
        options={getSuggestions()}
        components={components}
        // value={this.state.multi}
        // onChange={this.handleChange('multi')}
        placeholder={placeholder || ' '}
        isMulti={!!isMulti}
      />
    </div>
  );
};

const autocompleteStyles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${spacing.unit / 2}px ${spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        palette.type === 'light' ? palette.grey[300] : palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: spacing.unit * 2,
    },
  });

interface AutocompleteOptionType {
  readonly label: string;
}

type StyledAutocompleteProps = AutocompleteProps &
  WithStyles<typeof autocompleteStyles, true>;

export const Autocomplete = withStyles(autocompleteStyles, { withTheme: true })(
  StyledAutocomplete,
);
