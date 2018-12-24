import { Schema, SchemaDefinition } from 'mongoose';

export const INVENTORY_ITEM_SCHEMA_COLLECTION_NAME = 'InventoryItem';
export enum InventoryItemUnits {
  pcs = 'PCS',

  mg = 'MG',
  gr = 'GR',
  kg = 'KG',

  ml = 'ML',
  lt = 'LT',
}
const unitValues: Array<InventoryItemUnits> = Object.keys(
  InventoryItemUnits,
).map(key => InventoryItemUnits[key]);

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  unit: { type: String, enum: unitValues, required: true },
  alternates: {
    type: [Schema.Types.ObjectId],
    ref: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    required: false,
  },
};
export const InventoryItemSchema = new Schema(schemaDefinition);
