import { InventoryController } from './controllers/inventory.controller';
import { InventoryDbConnectorService } from './services/inventory-db-connector.service';
import { IsAlternateWithRelevantUnit } from './validators/is-alternate-with-relevant-unit.validator';
import { IsUniqueExistingInventoryItemNameForGivenClinic } from './validators/is-unique-existing-inventory-item-name-for-given-clinic.validator';
import { IsUniqueInventoryItemNameForGivenClinic } from './validators/is-unique-inventory-item-name-for-given-clinic.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import {
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  InventoryItemSchema,
} from './db-schemas/inventory-item.db-schema';
import {
  INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME,
  InventoryBalanceChangeSchema,
} from './db-schemas/inventory-balance-change.db-schema';

const schemasMap = [
  {
    name: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    collection: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    schema: InventoryItemSchema,
  },
  {
    name: INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME,
    collection: INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME,
    schema: InventoryBalanceChangeSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
  ],
  providers: [
    InventoryDbConnectorService,
    IsUniqueInventoryItemNameForGivenClinic,
    IsUniqueExistingInventoryItemNameForGivenClinic,
    IsAlternateWithRelevantUnit,
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
