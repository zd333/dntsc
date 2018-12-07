import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { Document, Model, Types } from 'mongoose';
import { EMPLOYEE_SCHEMA_NAME } from '../db-schemas/employee.db-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmployeesDbConnectorService {
  constructor(
    @InjectModel(EMPLOYEE_SCHEMA_NAME)
    private readonly EmployeeModel: Model<Document>,
  ) {}

  public async create(dto: CreateEmployeeInDto): Promise<Document> {
    const doc = new this.EmployeeModel({
      ...dto,
      isActive: true,
      hasToChangePassword: true,
    });

    return await doc.save();
  }

  public async getById(id: Types.ObjectId): Promise<Document | null> {
    return await this.EmployeeModel.findById(id).exec();
  }
}
