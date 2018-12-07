import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { Document, Model, Types } from 'mongoose';
import { EMPLOYEE_SCHEMA_NAME } from '../db-entities/employee.db-entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmployeesDbConnectorService {
  constructor(
    @InjectModel(EMPLOYEE_SCHEMA_NAME)
    private readonly EmployeeModel: Model<Document>,
  ) {}

  // TODO: login must be unique for clinic, check that none of passed clinics do not have target login yet
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
