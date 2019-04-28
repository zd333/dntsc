import * as React from 'react';
import { Add, Remove } from '@material-ui/icons';
import { Autocomplete } from '../../../shared/components/Autocomplete';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';

export interface InventoryBalancePageProps {
  readonly items: Array<InventoryItemVM>;
  readonly itemUnits: Array<TranslatedInventoryItemUnit>;
  readonly existingTags: Array<string>;
  readonly onSearch: (params: {
    readonly searchString?: string;
    readonly tagsToFilterBy?: Array<string>;
  }) => void;
  readonly onCreateBalanceChange: (params: {
    readonly itemId: InventoryItemVM['id'];
    readonly balanceChangeValue: number;
    readonly balanceChangeComment?: string;
  }) => void;
}

// TODO: split into several components
const StyledInventoryBalancePage: React.FunctionComponent<
  StyledInventoryBalanceProps
> = props => {
  const {
    intl,
    classes,
    items,
    itemUnits,
    existingTags,
    onSearch,
    onCreateBalanceChange,
  } = props;
  const [
    addBalanceChangeModalState,
    setAddBalanceChangeModalState,
  ] = React.useState<'closed' | 'addPositive' | 'addNegative'>('closed');
  const [
    itemIdToAddBalanceChange,
    setItemIdToAddBalanceChange,
  ] = React.useState<InventoryItemVM['id'] | undefined>(undefined);
  const [
    balanceChangeAmountValue,
    setBalanceChangeAmountValue,
  ] = React.useState<number | ''>('');
  const [
    balanceChangeCommentValue,
    setBalanceChangeCommentValue,
  ] = React.useState<string>('');
  const [searchString, setSearchString] = React.useState<string>('');
  const [tagsToFilterBy, setTagsToFilterBy] = React.useState<
    Array<string> | undefined
  >(undefined);
  const searchControlLabel = intl.formatMessage({
    id:
      'inventoryBalancePage.inventoryItemsBalancesList.searchItemsControl.label',
  });
  const filterByTagsControlLabel = intl.formatMessage({
    id:
      'inventoryBalancePage.inventoryItemsBalancesList..filterByTagsControl.label',
  });
  const amountControlLabel = intl.formatMessage({
    id:
      'inventoryBalancePage.addNewInventoryBalanceChangeDialog.amountControl.label',
  });
  const commentControlLabel = intl.formatMessage({
    id:
      'inventoryBalancePage.addNewInventoryBalanceChangeDialog.commentControl.label',
  });
  const getItemBalanceText = (item: InventoryItemVM) => {
    if (typeof item.balance === 'undefined') {
      return '';
    }

    const translatedUnit = itemUnits.find(unit => unit.unitValue === item.unit);

    return `${item.balance} ${
      translatedUnit ? translatedUnit.unitLabelShort : ''
    }`;
  };
  const getAddBalanceChangeDialogText = () => {
    if (!itemIdToAddBalanceChange) {
      return '';
    }
    const item = items.find(i => i.id === itemIdToAddBalanceChange);

    if (!item) {
      return '';
    }

    const translatedUnit = itemUnits.find(unit => unit.unitValue === item.unit);

    return `${item.name} (${
      translatedUnit ? translatedUnit.unitLabelFull : ''
    })`;
  };
  const handleSearchInputChange = (
    event: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const effectiveValue =
      event &&
      event.currentTarget &&
      event.currentTarget.value &&
      event.currentTarget.value.length >= 3
        ? event.currentTarget.value
        : '';

    setSearchString(effectiveValue);

    onSearch({
      tagsToFilterBy,
      searchString: effectiveValue,
    });
  };
  const handleFilterTagsChange = (tags: Array<string>) => {
    setTagsToFilterBy(tags);
    onSearch({
      searchString,
      tagsToFilterBy: tags,
    });
  };
  const handleBalanceAmountInputChange = (
    event: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const effectiveValue =
      event && event.currentTarget && Number(event.currentTarget.value);

    if (isNaN(effectiveValue) || effectiveValue < 0) {
      setBalanceChangeAmountValue('');

      return;
    }

    setBalanceChangeAmountValue(effectiveValue);
  };
  const handleBalanceCommentInputChange = (
    event: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setBalanceChangeCommentValue(
      (event && event.currentTarget && event.currentTarget.value) || '',
    );
  const handleAddBalanceChangeDialogClose = () => {
    setAddBalanceChangeModalState('closed');
    setItemIdToAddBalanceChange(undefined);
    setBalanceChangeAmountValue('');
    setBalanceChangeCommentValue('');
  };
  const handleAddBalanceChangeButtonClick = (params: {
    readonly itemId: InventoryItemVM['id'];
    readonly action: 'addPositive' | 'addNegative';
  }) => {
    const { itemId, action } = params;

    setBalanceChangeAmountValue('');
    setBalanceChangeCommentValue('');
    setItemIdToAddBalanceChange(itemId);
    setAddBalanceChangeModalState(action);
  };
  const handleAddBalanceChangeDialogSubmit = () => {
    if (!balanceChangeAmountValue) {
      return;
    }

    onCreateBalanceChange({
      itemId: itemIdToAddBalanceChange as string,
      balanceChangeValue:
        addBalanceChangeModalState === 'addPositive'
          ? balanceChangeAmountValue
          : -balanceChangeAmountValue,
      ...(balanceChangeCommentValue
        ? { balanceChangeComment: balanceChangeCommentValue }
        : {}),
    });

    setBalanceChangeAmountValue('');
    setBalanceChangeCommentValue('');
    setItemIdToAddBalanceChange(undefined);
    setAddBalanceChangeModalState('closed');
  };

  return (
    <React.Fragment>
      {/* Search bar*/}
      <div className={classes.searchBar}>
        <TextField
          label={searchControlLabel}
          fullWidth={true}
          variant="outlined"
          onChange={handleSearchInputChange}
        />
      </div>

      {/* Filter by tags control */}
      <div className={classes.filterTagsBar}>
        <Autocomplete
          value={tagsToFilterBy}
          options={existingTags}
          label={filterByTagsControlLabel}
          allowCreate={false}
          isMulti={true}
          onChange={handleFilterTagsChange}
        />
      </div>

      {/* Items list */}
      <List>
        {(items || []).map(item => (
          <ListItem key={item.id} dense className={classes.listItem}>
            <ListItemText
              primary={item.name}
              secondary={Array.isArray(item.tags) ? item.tags.join(', ') : ''}
            />
            <ListItemSecondaryAction>
              <Typography inline={true} component="h6" variant="subtitle1">
                {getItemBalanceText(item)}
              </Typography>
              <IconButton
                aria-label="Add"
                onClick={() =>
                  handleAddBalanceChangeButtonClick({
                    itemId: item.id,
                    action: 'addPositive',
                  })
                }
              >
                <Add />
              </IconButton>
              <IconButton
                aria-label="Remove"
                onClick={() =>
                  handleAddBalanceChangeButtonClick({
                    itemId: item.id,
                    action: 'addNegative',
                  })
                }
              >
                <Remove />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Add balance change dialog */}
      <Dialog
        open={
          addBalanceChangeModalState === 'addPositive' ||
          addBalanceChangeModalState === 'addNegative'
        }
        onClose={handleAddBalanceChangeDialogClose}
        aria-labelledby="balance-change-dialog-title"
      >
        <DialogTitle id="balance-change-dialog-title">
          {addBalanceChangeModalState === 'addPositive' ? (
            <FormattedMessage id="inventoryBalancePage.addNewInventoryBalanceChangeDialog.addPositiveMode.title" />
          ) : (
            <FormattedMessage id="inventoryBalancePage.addNewInventoryBalanceChangeDialog.addNegativeMode.title" />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {getAddBalanceChangeDialogText()}
          </DialogContentText>
          <TextField
            id="balance-change"
            value={balanceChangeAmountValue}
            type="number"
            inputProps={{ min: 0 }}
            label={amountControlLabel}
            autoFocus
            margin="dense"
            fullWidth
            onChange={handleBalanceAmountInputChange}
          />
          <TextField
            id="balance-change-comment"
            type="text"
            value={balanceChangeCommentValue}
            label={commentControlLabel}
            multiline
            rows="2"
            rowsMax="4"
            margin="dense"
            fullWidth
            onChange={handleBalanceCommentInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleAddBalanceChangeDialogClose}>
            <FormattedMessage id="common.cancelButtonLabel" />
          </Button>
          <Button
            color="primary"
            disabled={!balanceChangeAmountValue}
            onClick={handleAddBalanceChangeDialogSubmit}
          >
            {addBalanceChangeModalState === 'addPositive' ? (
              <FormattedMessage id="inventoryBalancePage.addNewInventoryBalanceChangeDialog.submitButton.addPositiveMode.label" />
            ) : (
              <FormattedMessage id="inventoryBalancePage.addNewInventoryBalanceChangeDialog.submitButton.addNegativeMode.label" />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

// TODO: make mobile friendly
const inventoryBalancePageStyles = ({ palette, spacing }: Theme) =>
  createStyles({
    searchBar: {
      display: 'flex',
      marginBottom: spacing.unit * 4,
    },
    filterTagsBar: {
      marginBottom: spacing.unit * 4,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });

type StyledInventoryBalanceProps = InventoryBalancePageProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryBalancePageStyles>;

const TranslatedInventoryBalancePage = injectIntl(StyledInventoryBalancePage);
export const InventoryBalancePage = withStyles(inventoryBalancePageStyles)(
  TranslatedInventoryBalancePage,
);
