import * as React from 'react';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import {
  Grid,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

export interface InventoryCatalogPageProps {
  readonly itemsDictionary: {
    readonly [key: string]: InventoryItemDetailsOutDto;
  };
  readonly updateIsAllowed: boolean;
  readonly addIsAllowed: boolean;
  readonly onAdd: (params: {
    readonly newItem: InventoryItemDetailsOutDto;
  }) => void;
  readonly onUpdate: (params: {
    readonly id: InventoryItemDetailsOutDto['id'];
    readonly updatedItem: InventoryItemDetailsOutDto;
  }) => void;
}

interface InventoryCatalogPageState {
  readonly selectedItem: string | undefined;
  readonly addNewItemModalIsOpened: boolean;
}

export class StyledInventoryCatalogPage extends React.Component<
  StyledInventoryCatalogProps,
  InventoryCatalogPageState
> {
  public state = {
    selectedItem: undefined,
    addNewItemModalIsOpened: false,
  };

  public render(): JSX.Element {
    // const { classes } = this.props;

    // TODO: make it column on mobile (item details on top, items list below)
    return (
      <Grid container spacing={24}>
        XXXXXXX
        <Grid item sm={12} md={6} />
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
