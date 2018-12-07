import { CLINIC_SCHEMA_NAME } from '../../clinics/db-entities/clinic.db-entity';
import { Schema, SchemaDefinition } from 'mongoose';

// TODO: add missing fields
const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
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
export const EmployeeSchema = new Schema(schemaDefinition);
export const EMPLOYEE_SCHEMA_NAME = 'Employee';
