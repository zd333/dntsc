import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongooseDocumentPasswordHashValid } from 'src/sub-features/shared/helpers/is-mongoose-document-password-hash-valid';
import { Model } from 'mongoose';
import {
  EMPLOYEE_SCHEMA_COLLECTION_NAME,
  EmployeeDocument,
} from '../db-schemas/employee.db-schema';

@Injectable()
export class EmployeesDbConnectorService {
  constructor(
    @InjectModel(EMPLOYEE_SCHEMA_COLLECTION_NAME)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  public async create(dto: CreateEmployeeInDto): Promise<EmployeeDocument> {
    const { targetClinicId, ...data } = dto;
    const doc: EmployeeDocument = new this.employeeModel({
      ...data,
      clinics: [targetClinicId],
      isActive: true,
      hasToChangePassword: true,
    });

    await doc.save();

    return doc;
  }

  public async getById(id: string): Promise<EmployeeDocument | null> {
    return await this.employeeModel.findById(id).exec();
  }

  public async checkEmployeeWithGivenPropertyValueExistsInSomeOfTheClinicsList(params: {
    readonly employeePropertyName: string;
    readonly employeePropertyValue: string;
    readonly clinics: Array<string>;
  }): Promise<boolean> {
    const { employeePropertyName, employeePropertyValue, clinics } = params;
    if (!employeePropertyName) {
      return await false;
    }

    // Checks if there is an employee with given property value and this employee has at least on clinic from passed clinics array
    const found = await this.employeeModel
      .find(
        {
          [employeePropertyName]: employeePropertyValue,
          clinics: { $in: clinics },
        },
        { limit: 1 },
      )
      .exec();

    return !!found && !!found.length;
  }

  /**f you pass clinic id - then it will return only employee from given clinic
   * (so will not return employee even if credentials are valid but employee is not in the clinic).
   */
  public async getByCredentials(params: {
    readonly login: string;
    readonly password: string;
    readonly clinicId?: string;
  }): Promise<EmployeeDocument | null> {
    const { login, password, clinicId } = params;
    const findConditions = clinicId ? { login, clinics: clinicId } : { login };
    const found = await this.employeeModel.find(findConditions).exec();

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
