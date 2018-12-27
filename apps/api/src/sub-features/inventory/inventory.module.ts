import { InventoryDbConnectorService } from './services/inventory-db-connector.service';
import { InventoryItemsController } from './controllers/inventory-items.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  InventoryItemSchema,
} from './db-schemas/inventory-item.db-schema';

const schemasMap = [
  {
    name: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    collection: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    schema: InventoryItemSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [InventoryDbConnectorService],
  controllers: [InventoryItemsController],
})
export class InventoryModule {}
