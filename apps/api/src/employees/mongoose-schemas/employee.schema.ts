import * as mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({});

export const EMPLOYEE_SCHEMA_NAME = 'Employee';

export const employeeSchemaMap = {
  name: EMPLOYEE_SCHEMA_NAME,
  schema: EmployeeSchema,
};
