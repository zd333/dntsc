import { CreateEmployeeRegistrationTokenInDtoWithClinicContext } from '../dto/create-employee-registration-token.in-dto';
import { getMongoFindConditionForFieldSearch } from '../../shared/helpers/get-mongo-find-condition-for-field-search';
import { getPaginationMongoFindOptionsFromDto } from '../../shared/helpers/get-pagination-mongo-find-options-from-in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongooseDocumentPasswordHashValid } from '../../../sub-features/shared/helpers/is-mongoose-document-password-hash-valid';
import { Model } from 'mongoose';
import { MongoFindResults } from '../../shared/helpers/convert-documents-to-paginated-list-out-dto';
import { QueryParamsForSearchablePaginatedListInDto } from '../../shared/dto/query-params-for-paginated-list.in-dto';
import { RegisterEmployeeInDtoWithClinicContext } from '../dto/register-employee.in-dto';
import { UpdateEmployeeInDtoWithClinicContext } from '../dto/update-employee.in-dto';
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

  public async create(
    dto: RegisterEmployeeInDtoWithClinicContext &
      CreateEmployeeRegistrationTokenInDtoWithClinicContext,
  ): Promise<EmployeeDocument> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.employeeModel({
      ...data,
      clinics: [targetClinicId],
      // All new employees are not active by default
      isActive: false,
    });

    await doc.save();

    return doc;
  }

  public async getById(id: string): Promise<EmployeeDocument | null> {
    return await this.employeeModel.findById(id).exec();
  }

  public async getClinicEmployee(params: {
    readonly clinicId: string;
    readonly paginationParams?: QueryParamsForSearchablePaginatedListInDto;
  }): Promise<MongoFindResults<EmployeeDocument>> {
    const { clinicId, paginationParams } = params;
    const findOptions = getPaginationMongoFindOptionsFromDto(paginationParams);
    const findConditions = {
      clinics: clinicId,
      // Add search condition only if search string is present
      ...(paginationParams && paginationParams.searchString
        ? getMongoFindConditionForFieldSearch({
            fieldName: 'name',
            searchString: paginationParams.searchString,
          })
        : {}),
    };

    const documents = await this.employeeModel
      .find(findConditions, null, findOptions)
      .exec();
    const skipped = findOptions.skip || 0;
    const totalCount = findOptions.limit
      ? await this.employeeModel.estimatedDocumentCount().exec()
      : skipped + documents.length;

    return { documents, skipped, totalCount };
  }

  public async checkEmployeeWithGivenPropertyValueExists(params: {
    readonly employeePropertyName: keyof EmployeeDocument;
    // This is really any
    /* tslint:disable:no-any */
    readonly employeePropertyValue: any;
    /**
     * If clinics are passed - then verification will be done only for given ones
     */
    readonly clinics?: Array<string>;
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
          ...(clinics ? { clinics: { $in: clinics } } : {}),
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

  public async update(params: {
    readonly id: string;
    readonly dto: UpdateEmployeeInDtoWithClinicContext;
  }): Promise<void> {
    const { id, dto } = params;
    const { id: _, targetClinicId, ...dtoWithStrippedId } = dto;
    // Unset statement for optional fields to delete them
    const unsetStatement = !dtoWithStrippedId.roles
      ? {
          $unset: {
            roles: undefined,
          },
        }
      : // Nothing to unset/delete
        {};
    const docUpdates = {
      ...dtoWithStrippedId,
      ...unsetStatement,
    };

    await this.employeeModel.findByIdAndUpdate(id, docUpdates);
  }
}
