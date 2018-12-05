import { CLINIC_SCHEMA_NAME } from '../../clinics/models/clinic.model';
import { Document, Schema, Types } from 'mongoose';

// TODO: add missing fields
export interface Employee {
  readonly name: string;
  readonly isActive: boolean;
  readonly login: string;
  readonly password: string;
  readonly hasToChangePassword?: true;
  readonly clinics: Array<Types.ObjectId>;
}

export type EmployeeDocument = Readonly<Document> & Employee;

export const EmployeeSchema = new Schema({
  name: String,
  isActive: Boolean,
  login: String,
  password: String,
  hasToChangePassword: { required: false, type: Boolean },
  clinics: [{ type: Schema.Types.ObjectId, ref: CLINIC_SCHEMA_NAME }],
});

export const EMPLOYEE_SCHEMA_NAME = 'Employee';
