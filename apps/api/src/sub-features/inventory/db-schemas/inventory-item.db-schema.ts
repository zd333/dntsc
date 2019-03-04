import { CLINIC_SCHEMA_COLLECTION_NAME } from '../../../../src/sub-features/clinics/db-schemas/clinic.db-schema';
import { Document, Schema, SchemaDefinition } from 'mongoose';
import { tuple } from '../../shared/helpers/tuple';

export const INVENTORY_ITEM_SCHEMA_COLLECTION_NAME = 'InventoryItems';

export const allInventoryItemUnits = tuple(
  'PCS',

  'MG',
  'GR',
  'KG',

  'ML',
  'LT',
);

export type InventoryItemUnits = typeof allInventoryItemUnits[number];

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true, text: true },
  unit: { type: String, enum: allInventoryItemUnits, required: true },
  clinics: {
    type: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_COLLECTION_NAME }],
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  alternates: {
    type: [Schema.Types.ObjectId],
    ref: INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
    required: false,
  },
};

export type InventoryItemDocument = Readonly<Document> & {
  readonly name: string;
  readonly unit: InventoryItemUnits;
  readonly clinics: Array<string>;
  readonly tags?: Array<string>;
  readonly alternates?: Array<string>;
};

export const InventoryItemSchema = new Schema(schemaDefinition);
