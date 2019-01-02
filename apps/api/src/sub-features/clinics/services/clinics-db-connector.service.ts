import { CLINIC_SCHEMA_COLLECTION_NAME } from '../db-schemas/clinic.db-schema';
import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClinicsDbConnectorService {
  constructor(
    @InjectModel(CLINIC_SCHEMA_COLLECTION_NAME)
    private readonly clinicModel: Model<Document>,
  ) {}

  public async create(dto: CreateClinicInDto): Promise<Document> {
    const doc = new this.clinicModel(dto);

    return await doc.save();
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
