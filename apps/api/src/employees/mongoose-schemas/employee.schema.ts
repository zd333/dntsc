import * as mongoose from 'mongoose';

// TODO: add missing fields
const EmployeeSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
  login: String,
  password: String,
  userHasToChangePassword: { required: false, type: Boolean },
});

export const EMPLOYEE_SCHEMA_NAME = 'Employee';

export const employeeSchemaMap = {
  name: EMPLOYEE_SCHEMA_NAME,
  schema: EmployeeSchema,
};
