import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CLINIC_SCHEMA_COLLECTION_NAME,
  ClinicDocument,
} from '../db-schemas/clinic.db-schema';

@Injectable()
export class ClinicsDbConnectorService {
  constructor(
    @InjectModel(CLINIC_SCHEMA_COLLECTION_NAME)
    private readonly clinicModel: Model<ClinicDocument>,
  ) {}

  public async create(dto: CreateClinicInDto): Promise<ClinicDocument> {
    const doc = new this.clinicModel(dto);

    await doc.save();

    return doc;
  }

  public async getById(id: string): Promise<ClinicDocument | null> {
    return await this.clinicModel.findById(id).exec();
  }

  public async checkHostNamesAreUsedInSomeClinics(
    hostNamesToCheck: Array<string>,
  ): Promise<boolean> {
    const found = await this.clinicModel
      .find({ hostNames: { $in: hostNamesToCheck } }, { limit: 1 })
      .exec();

    return !!found && !!found.length;
  }

  public async getClinicIdByHostName(params: {
    hostName: string;
  }): Promise<string | undefined> {
    const { hostName } = params;
    const found = await this.clinicModel
      .find(
        { hostNames: hostName },
        // Expected to be unique, thus get only one
        { limit: 1 },
      )
      .exec();

    return found && found.length ? found[0]._id.toHexString() : undefined;
  }
}
