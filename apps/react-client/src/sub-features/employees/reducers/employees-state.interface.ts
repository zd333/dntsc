import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';

export interface EmployeesState {
  readonly createEmployeeRegistrationTokenInProgress: boolean;
  readonly createdRegistrationToken: string;
}
