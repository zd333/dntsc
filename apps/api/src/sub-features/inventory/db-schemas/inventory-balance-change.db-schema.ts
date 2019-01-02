import { CLINIC_SCHEMA_COLLECTION_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from './inventory-item.db-schema';
import { Schema, SchemaDefinition } from 'mongoose';

export const INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME =
  'InventoryBalanceChanges';

// !Note schema also contains timestamps (see schema options below)
const schemaDefinition: SchemaDefinition = {
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    required: true,
  },
  clinic: {
    type: Schema.Types.ObjectId,
    ref: CLINIC_SCHEMA_COLLECTION_NAME,
    required: true,
  },
  amount: { type: Number, required: true },
  comment: { type: String, required: false },
};
export const InventoryBalanceChangeSchema = new Schema(schemaDefinition, {
  timestamps: true,
});
