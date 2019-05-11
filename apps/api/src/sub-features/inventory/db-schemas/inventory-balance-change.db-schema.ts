import { CLINIC_SCHEMA_COLLECTION_NAME } from '../../../sub-features/clinics/db-schemas/clinic.db-schema';
import { Document, Schema, SchemaDefinition } from 'mongoose';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from './inventory-item.db-schema';

export const INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME =
  'InventoryBalanceChanges';

// !Note schema also contains timestamps (see schema options below)
const schemaDefinition: SchemaDefinition = {
  item: {
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

export type InventoryBalanceChangeDocument = Readonly<Document> & {
  readonly item: string;
  readonly clinic: string;
  readonly amount: number;
  readonly comment?: string;
};

export const InventoryBalanceChangeSchema = new Schema(schemaDefinition, {
  timestamps: true,
});
