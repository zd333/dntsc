import * as React from 'react';
import { Autocomplete } from '../../../shared/components/Autocomplete';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { InventoryItemsList } from './InventoryItemsList';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { Omitted } from '../../../shared/types/omitted.type';
import { TranslatedInventoryItemUnit } from '../selectors/translated-inventory-item-units.selector';
import {
  InventoryItemDetailsForm,
  InventoryItemDetailsFormProps,
} from './InventoryItemDetailsForm';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

export interface InventoryBalancePageProps {
  readonly items: Array<InventoryItemVM>;
  readonly existingTags: Array<string>;
  readonly onSearch: (params: {
    readonly searchString?: string;
    readonly tagsToFilterBy?: Array<string>;
  }) => void;
  readonly onCreateBalanceChange: () => void;
}

const StyledInventoryBalancePage: React.FunctionComponent<
  StyledInventoryBalanceProps
> = props => {
  const { intl, classes, items, existingTags, onSearch } = props;
  const [
    addBalanceChangeModalState,
    setAddBalanceChangeModalState,
  ] = React.useState<'closed' | 'addPositive' | 'addNegative'>('closed');
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
          <ListItem key={item.id} dense>
            <ListItemText primary={item.name} />
            {/* TODO: add balance value, units and +/- balance change buttons */}
          </ListItem>
        ))}
      </List>

      {/* TODO: add balance change dialog */}
    </React.Fragment>
  );
};

const inventoryBalancePageStyles = ({ palette, spacing }: Theme) =>
  createStyles({
    searchBar: {
      display: 'flex',
      marginBottom: spacing.unit * 4,
    },
    filterTagsBar: {
      marginBottom: spacing.unit * 4,
    },
  });

type StyledInventoryBalanceProps = InventoryBalancePageProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryBalancePageStyles>;

const TranslatedInventoryBalancePage = injectIntl(StyledInventoryBalancePage);
export const InventoryBalancePage = withStyles(inventoryBalancePageStyles)(
  TranslatedInventoryBalancePage,
);
