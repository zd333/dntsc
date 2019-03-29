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

/**
 * Default react-select option type.
 * `label` and `value` are duplicated, not many sense, but easier than
 * struggling with library.
 */
interface ReactSelectOption {
  readonly label: string;
  readonly value: string;
}
export interface AutocompleteProps<T> {
  readonly value: T | Array<T> | undefined;
  readonly options: Array<T>;
  readonly label: string;
  readonly placeholder?: string;
  readonly isDisabled?: boolean;
  readonly allowCreate?: boolean;
  readonly isMulti?: boolean;
  readonly getDisplayValue?: (optionItem: T) => ReactSelectOption['label'];
  readonly getUniqueId?: (optionItem: T) => ReactSelectOption['value'];
  /**
   * This prop will work only when `allowCreate` is true.
   * If function is not passed - then new items will not be emitted among `onChange` values.
   */
  readonly newItemCreator?: (newOption: ReactSelectOption['value']) => T;
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

function StyledAutocomplete<T>(
  props: StyledAutocompleteProps<T>,
): React.ReactElement<T> {
  const {
    classes,
    theme,
    isMulti,
    getDisplayValue = (v: T) => String(v),
    getUniqueId = (v: T) => String(v),
    newItemCreator,
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

  const getSuggestions = (): Array<ReactSelectOption> =>
    Array.isArray(options)
      ? options.map(option => ({
          label: getDisplayValue(option),
          value: getUniqueId(option),
        }))
      : [];
  const getCurrentValue = ():
    | Array<ReactSelectOption>
    | ReactSelectOption
    | undefined => {
    if (isMulti) {
      return Array.isArray(value)
        ? value.map(v => ({
            label: getDisplayValue(v),
            value: getUniqueId(v),
          }))
        : value
        ? [
            {
              label: getDisplayValue(value),
              value: getUniqueId(value),
            },
          ]
        : undefined;
    }
    if (Array.isArray(value)) {
      const v = value[0];

      return {
        label: getDisplayValue(v),
        value: getUniqueId(v),
      };
    }

    return value
      ? {
          label: getDisplayValue(value),
          value: getUniqueId(value),
        }
      : undefined;
  };
  const handleChange = (
    eventVal: Array<ReactSelectOption> | ReactSelectOption,
  ) => {
    if (!eventVal) {
      return;
    }
    const originalOptions = Array.isArray(options) ? options : [];
    const eventValues = Array.isArray(eventVal) ? eventVal : [eventVal];
    const valMapper = (option: ReactSelectOption) => {
      const foundOriginalOption = originalOptions.find(
        originalOption => getUniqueId(originalOption) === option.value,
      );
      if (foundOriginalOption) {
        return foundOriginalOption;
      }

      return allowCreate && typeof newItemCreator === 'function'
        ? newItemCreator(option.value)
        : undefined;
    };

    if (isMulti) {
      onChange(eventValues.map(valMapper).filter(v => !!v) as Array<T>);

      return;
    }

    const singleValue = valMapper(eventValues[0]);
    if (singleValue) {
      onChange(singleValue);
    }
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

function Control<T>(props: ControlProps<ReactSelectOption>): JSX.Element {
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

function Menu<T>(props: MenuProps<ReactSelectOption>): JSX.Element {
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

function MultiValue<T>(props: MultiValueProps<ReactSelectOption>): JSX.Element {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={props.selectProps.classes.chip}
      onDelete={props.isDisabled ? undefined : props.removeProps.onClick}
      deleteIcon={
        props.isDisabled ? undefined : <CancelIcon {...props.removeProps} />
        // Prettier vs tslint :)
        // tslint:disable-next-line:jsx-curly-spacing
      }
    />
  );
}

function NoOptionsMessage<T>(
  props: NoticeProps<ReactSelectOption>,
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

function Option<T>(props: OptionProps<ReactSelectOption>): JSX.Element {
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

function Placeholder<T>(
  props: PlaceholderProps<ReactSelectOption>,
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

function SingleValue<T>(
  props: SingleValueProps<ReactSelectOption>,
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

function ValueContainer<T>(
  props: ValueContainerProps<ReactSelectOption>,
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

type StyledAutocompleteProps<T> = AutocompleteProps<T> &
  WithStyles<typeof autocompleteStyles, true>;

export const Autocomplete = withStyles(autocompleteStyles, { withTheme: true })(
  StyledAutocomplete,
);
