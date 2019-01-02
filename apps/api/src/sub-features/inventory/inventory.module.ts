import { InventoryController } from './controllers/inventory.controller';
import { InventoryDbConnectorService } from './services/inventory-db-connector.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
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
  ],
  providers: [InventoryDbConnectorService],
  controllers: [InventoryController],
})
export class InventoryModule {}
