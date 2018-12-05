import { Document, Schema, Types } from 'mongoose';

// TODO: ad missing fields (licenses, payment info)
export interface Tenant {
  readonly name: string;
}

export type TenantDocument = Readonly<Document> & Tenant;

export const TenantSchema = new Schema({
  name: String,
});

export const TENANT_SCHEMA_NAME = 'Tenant';
