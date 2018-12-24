import { AppAccessRoles } from 'src/app-access-roles';
import { CLINIC_SCHEMA_COLLECTION_NAME } from '../../clinics/db-schemas/clinic.db-schema';
import {
  Document,
  Schema,
  SchemaDefinition,
  Types
  } from 'mongoose';
import { passwordHashingHook } from 'src/sub-features/shared/helpers/password-hashing-mongoose-schema-hook';

export const EMPLOYEE_SCHEMA_COLLECTION_NAME = 'Employee';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  login: { type: String, required: true },
  /**
   * This will be hashed via bcrypt and never saved in plain text form.
   * See `passwordHashingHook`.
   */
  password: String,
  hasToChangePassword: { type: Boolean, required: false },
  clinics: {
    type: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_COLLECTION_NAME }],
    required: true,
    validate: {
      validator(value) {
        return !!value && !!value.length;
      },
      message: 'At least one clinic is required',
    },
  },
  roles: { type: [String], required: false },
};

const schema = new Schema(schemaDefinition);
schema.pre('save', passwordHashingHook);

export type EmployeeDocument = Readonly<Document> & {
  name: string;
  isActive: boolean;
  login: string;
  password: string;
  hasToChangePassword?: boolean;
  clinics: Array<Types.ObjectId>;
  roles: Array<AppAccessRoles>;
};

export const EmployeeSchema = schema;
