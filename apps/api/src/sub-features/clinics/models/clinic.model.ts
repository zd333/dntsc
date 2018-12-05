import { Document, Schema, Types } from 'mongoose';
import { TENANT_SCHEMA_NAME } from 'src/sub-features/tenants/models/tenant.model';

export interface Clinic {
  readonly name: string;
  readonly tenant: Types.ObjectId;
}

export type ClinicDocument = Readonly<Document> & Clinic;

export const ClinicSchema = new Schema({
  name: String,
  tenant: { type: Schema.Types.ObjectId, ref: TENANT_SCHEMA_NAME },
});

export const CLINIC_SCHEMA_NAME = 'Clinic';
