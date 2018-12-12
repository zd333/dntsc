import { CLINIC_SCHEMA_NAME } from '../../clinics/db-schemas/clinic.db-schema';
import {
  Document,
  Schema,
  SchemaDefinition,
  Types
  } from 'mongoose';
import { passwordHashingHook } from 'src/helpers/password-hashing-mongoose-schema-hook';

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
    type: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_NAME }],
    required: true,
    validate: {
      validator(value) {
        return !!value && !!value.length;
      },
      message: 'At least one clinic is required',
    },
  },
};

const schema = new Schema(schemaDefinition);
schema.pre('save', passwordHashingHook);

export type EmployeeDocument = Readonly<Document> & {
  name: string;
  isActive: boolean;
  login: string;
  password: string;
  hasToChangePassword?: boolean;
  // TODO: should be or type with array of clinic documents (when using populate)?
  clinics: Array<Types.ObjectId>;
};

export const EmployeeSchema = schema;

export const EMPLOYEE_SCHEMA_NAME = 'Employee';
