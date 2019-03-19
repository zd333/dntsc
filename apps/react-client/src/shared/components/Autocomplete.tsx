import * as React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Select, { Creatable } from 'react-select';
import { ControlProps } from 'react-select/lib/components/Control';
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

interface AutocompleteOptionType {
  readonly label: string;
  // TODO: refactor to string value (it should contain id to use later in handleChange)
  readonly value: string;
}
export interface AutocompleteProps<T extends object> {
  readonly value: T | Array<T> | undefined;
  /**
   * Value of option prop with this name will be used as display value in autocomplete options.
   */
  readonly optionLabelPropName: string;
  /**
   * Value of option prop with this name will be used as unique identifier to reorganize options.
   */
  readonly optionKeyPropName: string;
  readonly options: Array<T>;
  readonly label: string;
  readonly placeholder?: string;
  readonly isDisabled?: boolean;
  readonly allowCreate?: boolean;
  readonly isMulti?: boolean;
  readonly onChange: (value: T | Array<T>) => void;
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

function StyledAutocomplete<T extends object>(
  props: StyledAutocompleteProps<T>,
): React.ReactElement<T> {
  const {
    classes,
    theme,
    isMulti,
    optionLabelPropName,
    options,
    label,
    placeholder,
    value,
    allowCreate,
    isDisabled,
    onChange,
  } = props;
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
    Array.isArray(options)
      ? options.map(option => ({
          label: String(option[optionLabelPropName]),
          value: option,
        }))
      : [];
  const getCurrentValue = ():
    | Array<AutocompleteOptionType>
    | AutocompleteOptionType
    | undefined => {
    if (isMulti) {
      return Array.isArray(value)
        ? value.map(v => ({ label: String(v[optionLabelPropName]), value: v }))
        : value
        ? [
            {
              value,
              label: String(value[optionLabelPropName]),
            },
          ]
        : undefined;
    }
    if (Array.isArray(value)) {
      const v = value[0];

      return { label: String(v[optionLabelPropName]), value: v };
    }

    return value
      ? {
          value,
          label: String(value[optionLabelPropName]),
        }
      : undefined;
  };
  const handleChange = (
    val: Array<AutocompleteOptionType<T>> | AutocompleteOptionType<T>,
  ) => {
    if (!val) {
      return;
    }
    if (isMulti) {
      onChange(Array.isArray(val) ? val.map(v => v.value) : [val.value]);

      return;
    }

    onChange(Array.isArray(val) ? val[0].value : val.value);
  };
  const controlProps = {
    classes,
    components,
    isDisabled,
    styles: selectStyles,
    textFieldProps: {
      label,
      InputLabelProps: {
        shrink: true,
      },
    },
    isMulti: !!isMulti,
    placeholder: placeholder || ' ',
    options: getSuggestions(),
    value: getCurrentValue(),
    onChange: handleChange,
  };

  return (
    <div className={classes.root}>
      {allowCreate ? (
        <Creatable {...controlProps} />
      ) : (
        <Select {...controlProps} />
      )}
    </div>
  );
}

function inputComponent({
  inputRef,
  ...props
}: InputBaseComponentProps): JSX.Element {
  // Too complicated for typing
  // tslint:disable-next-line:no-any
  return <div ref={inputRef} {...props as any} />;
}

function Control<T extends object>(
  props: ControlProps<AutocompleteOptionType<T>>,
): JSX.Element {
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

function Menu<T extends object>(
  props: MenuProps<AutocompleteOptionType<T>>,
): JSX.Element {
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

function MultiValue<T extends object>(
  props: MultiValueProps<AutocompleteOptionType<T>>,
): JSX.Element {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={props.selectProps.classes.chip}
      onDelete={props.isDisabled ? undefined : props.removeProps.onClick}
      deleteIcon={
        props.isDisabled ? undefined : <CancelIcon {...props.removeProps} />
      }
    />
  );
}

function NoOptionsMessage<T extends object>(
  props: NoticeProps<AutocompleteOptionType<T>>,
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

function Option<T extends object>(
  props: OptionProps<AutocompleteOptionType<T>>,
): JSX.Element {
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

function Placeholder<T extends object>(
  props: PlaceholderProps<AutocompleteOptionType<T>>,
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

function SingleValue<T extends object>(
  props: SingleValueProps<AutocompleteOptionType<T>>,
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

function ValueContainer<T extends object>(
  props: ValueContainerProps<AutocompleteOptionType<T>>,
): JSX.Element {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

const autocompleteStyles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  });

type StyledAutocompleteProps<T extends object> = AutocompleteProps<T> &
  WithStyles<typeof autocompleteStyles, true>;

export const Autocomplete = withStyles(autocompleteStyles, { withTheme: true })(
  StyledAutocomplete,
);
