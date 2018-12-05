import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  EMPLOYEE_SCHEMA_NAME,
  EmployeeDocument,
} from '../models/employee.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(EMPLOYEE_SCHEMA_NAME)
    private readonly EmployeeModel: Model<EmployeeDocument>,
  ) {}

  // TODO: login must be unique for clinic, check that passed clinics do not have target login yet
  public async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const employee = new this.EmployeeModel({
      ...createEmployeeDto,
      isActive: true,
      hasToChangePassword: true,
    });
    return (await employee.save()) as EmployeeDocument;
  }

  public async getById(id: Types.ObjectId): Promise<EmployeeDocument | null> {
    return await this.EmployeeModel.findById(id).exec();
  }
}
