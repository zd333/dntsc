import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { CLINIC_SCHEMA_COLLECTION_NAME } from '../../clinics/db-schemas/clinic.db-schema';
import { Document, Schema, SchemaDefinition, Types } from 'mongoose';
import { passwordHashingHook } from '../../../sub-features/shared/helpers/password-hashing-mongoose-schema-hook';

export const EMPLOYEE_SCHEMA_COLLECTION_NAME = 'Employees';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  login: { type: String, required: true },
  /**
   * This will be hashed via bcrypt and never saved in plain text form.
   * See `passwordHashingHook`.
   */
  password: String,
  clinics: {
    type: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_COLLECTION_NAME }],
    required: false,
  },
  roles: [{ type: String, enum: allAppAccessRoles, required: false }],
  registrationToken: { type: String, required: false },
};

const schema = new Schema(schemaDefinition);
schema.pre('save', passwordHashingHook);

export type EmployeeDocument = Readonly<Document> & {
  readonly name: string;
  readonly isActive: boolean;
  readonly login: string;
  readonly password: string;
  readonly clinics: Array<Types.ObjectId>;
  readonly roles?: Array<AppAccessRoles>;
  readonly registrationToken?: string;
};

export const EmployeeSchema = schema;
