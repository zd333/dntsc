import { CLINIC_SCHEMA_COLLECTION_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { Schema, SchemaDefinition } from 'mongoose';

export const INVENTORY_ITEM_SCHEMA_COLLECTION_NAME = 'InventoryItems';
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
  name: { type: String, required: true, text: true },
  unit: { type: String, enum: unitValues, required: true },
  clinics: {
    type: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_COLLECTION_NAME }],
    required: true,
  },
  alternates: {
    type: [Schema.Types.ObjectId],
    ref: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    required: false,
  },
};
export const InventoryItemSchema = new Schema(schemaDefinition);
