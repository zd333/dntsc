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

interface InventoryBalancePageState {
  readonly addBalanceChangeModalState: 'closed' | 'addPositive' | 'addNegative';
  readonly currentSearchString: string;
  readonly currentTagsToFilterBy?: Array<string>;
}

// TODO: refactor with `useState` hook
export class StyledInventoryBalancePage extends React.PureComponent<
  StyledInventoryBalanceProps,
  InventoryBalancePageState
> {
  public render(): JSX.Element {
    return <div>TODO</div>;
  }
}

const inventoryBalancePageStyles = ({ breakpoints, spacing }: Theme) =>
  createStyles({});

type StyledInventoryBalanceProps = InventoryBalancePageProps &
  InjectedIntlProps &
  WithStyles<typeof inventoryBalancePageStyles>;

const TranslatedInventoryBalancePage = injectIntl(StyledInventoryBalancePage);
export const InventoryBalancePage = withStyles(inventoryBalancePageStyles)(
  TranslatedInventoryBalancePage,
);
