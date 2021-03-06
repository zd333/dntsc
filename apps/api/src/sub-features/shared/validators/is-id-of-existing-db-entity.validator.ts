import { Connection, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Use this with DTO property that must have id value.
 * Pass schema name and validator will check that entity with given id exists in db.
 * Uses Mongo directly (without connector services) - not good, but acceptable due to
 * validator is very generic.
 */
@ValidatorConstraint({ name: 'isIdOfExistingEntity', async: true })
@Injectable()
export class IsIdOfExistingDbEntityValidator
  implements ValidatorConstraintInterface {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
  ) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    // Check id is valid Mongo ObjectId
    if (!Types.ObjectId.isValid(value)) {
      return false;
    }
    // Check schema name (constraint)
    const schemaName = validationArguments.constraints[0];

    if (!schemaName || typeof schemaName !== 'string') {
      return false;
    }

    // Check schema/model exists
    const existingSchemaNames = this.mongoConnection.modelNames();
    if (
      !existingSchemaNames ||
      !Array.isArray(existingSchemaNames) ||
      existingSchemaNames.every(name => name !== schemaName)
    ) {
      // Passed schema name/model does not exist
      return false;
    }

    const model = this.mongoConnection.model(schemaName);
    const entity = await model.find({ _id: value }, { limit: 1 }).exec();

    return !!entity && !!entity.length;
  }

  public defaultMessage(): string {
    return '$property must be id of existing entity';
  }
}
