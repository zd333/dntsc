import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongooseDocumentPasswordHashValid } from 'src/sub-features/shared/helpers/is-mongoose-document-password-hash-valid';
import { Model, Types } from 'mongoose';
import {
  EMPLOYEE_SCHEMA_COLLECTION_NAME,
  EmployeeDocument,
} from '../db-schemas/employee.db-schema';

@Injectable()
export class EmployeesDbConnectorService {
  constructor(
    @InjectModel(EMPLOYEE_SCHEMA_COLLECTION_NAME)
    private readonly EmployeeModel: Model<EmployeeDocument>,
  ) {}

  public async create(dto: CreateEmployeeInDto): Promise<EmployeeDocument> {
    const doc: EmployeeDocument = new this.EmployeeModel({
      ...dto,
      isActive: true,
      hasToChangePassword: true,
    });

    await doc.save();

    return doc;
  }

  public async getById(id: Types.ObjectId): Promise<EmployeeDocument | null> {
    return await this.EmployeeModel.findById(id).exec();
  }

  public async checkEmployeeWithGivenPropertyValueExistsInSomeOfTheClinicsList(params: {
    readonly employeePropertyName: string;
    readonly employeePropertyValue: string;
    readonly clinics: Array<Types.ObjectId>;
  }): Promise<boolean> {
    const { employeePropertyName, employeePropertyValue, clinics } = params;
    if (!employeePropertyName) {
      return await false;
    }

    // Checks if there is an employee with given property value and this employee has at least on clinic from passed clinics array
    const found = await this.EmployeeModel.find(
      {
        [employeePropertyName]: employeePropertyValue,
        clinics: { $in: clinics },
      },
      { limit: 1 },
    );

    return !!found && !!found.length;
  }

  public async getByCredentials(params: {
    readonly login: string;
    readonly password: string;
    readonly clinicId?: Types.ObjectId;
  }): Promise<EmployeeDocument | null> {
    const { login, password, clinicId } = params;
    const findParams = clinicId ? { login, clinics: clinicId } : { login };
    const found = await this.EmployeeModel.find(findParams).exec();

    if (!found || !found.length) {
      return null;
    }

    const employee = found[0];
    // Check password matches
    const passwordIsValid = await isMongooseDocumentPasswordHashValid({
      document: employee,
      passwordCandidate: password,
    });
    if (!passwordIsValid) {
      return null;
    }

    // All is ok
    return employee;
  }
}
