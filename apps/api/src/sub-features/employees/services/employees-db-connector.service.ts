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

  public async checkEmployeeWithGivenNameExistsInSomeOfTheClinicsList(params: {
    readonly employeeName: string;
    readonly clinics: Array<Types.ObjectId>;
  }): Promise<boolean> {
    // Check params
    if (
      !params ||
      !params.employeeName ||
      !Array.isArray(params.clinics) ||
      !params.clinics.length
    ) {
      return await false;
    }

    const { employeeName, clinics } = params;
    // At least one of the clinics (from passed clinics array) is in employees' (with target name) clinics array
    const found = await this.EmployeeModel.find({
      name: employeeName,
      clinics: { $in: clinics },
    });

    return !!found && !!found.length;
  }
}
