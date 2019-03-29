import { InventoryItem } from '../selectors/items-dictionary.selector';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';

export function inventoryItemViewModelToDto(
  viewModel: InventoryItem,
): InventoryItemDetailsOutDto {
  return {
    ...viewModel,
    alternates:
      viewModel.alternates &&
      viewModel.alternates.map(alternate => alternate.id),
  };
}
