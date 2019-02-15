import * as React from 'react';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { InventoryItemsList } from './InventoryItemsList';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

export interface InventoryCatalogPageProps {
  readonly items: Array<InventoryItemDetailsOutDto>;
  readonly updateIsAllowed: boolean;
  readonly createIsAllowed: boolean;
  readonly onCreate: (params: {
    readonly newItem: InventoryItemDetailsOutDto;
  }) => void;
  readonly onUpdate: (params: {
    readonly id: InventoryItemDetailsOutDto['id'];
    readonly updatedItem: InventoryItemDetailsOutDto;
  }) => void;
}

interface InventoryCatalogPageState {
  readonly idOfSelectedItem: string | undefined;
  readonly addNewItemModalIsOpened: boolean;
}

export class StyledInventoryCatalogPage extends React.Component<
  StyledInventoryCatalogProps,
  InventoryCatalogPageState
> {
  public state = {
    idOfSelectedItem: undefined,
    addNewItemModalIsOpened: false,
  };

  public render(): JSX.Element {
    const { items } = this.props;
    const { idOfSelectedItem } = this.state;

    // TODO: make it column on mobile (item details on top, items list below)
    return (
      <Grid container spacing={24}>
        <Grid item sm={12} md={6}>
          <InventoryItemsList
            items={items}
            indexOfSelectedItem={idOfSelectedItem}
            // TODO: bind handlers
            onSelect={console.log}
            onUpdateClick={console.log}
          />
        </Grid>
        <Grid item sm={12} md={6} />
      </Grid>
    );
  }
}

const inventoryCatalogPageStyles = ({ palette, spacing }: Theme) =>
  createStyles({});

type StyledInventoryCatalogProps = InventoryCatalogPageProps &
  WithStyles<typeof inventoryCatalogPageStyles>;

export const InventoryCatalogPage = withStyles(inventoryCatalogPageStyles)(
  StyledInventoryCatalogPage,
);
