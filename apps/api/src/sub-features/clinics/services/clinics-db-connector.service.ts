import { CLINIC_SCHEMA_NAME } from '../db-schemas/clinic.db-schema';
import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClinicsDbConnectorService {
  constructor(
    @InjectModel(CLINIC_SCHEMA_NAME)
    private readonly ClinicModel: Model<Document>,
  ) {}

  public async create(dto: CreateClinicInDto): Promise<Document> {
    const doc = new this.ClinicModel(dto);

    return await doc.save();
  }

  public async checkHostNamesAreUsedInSomeClinics(
    hostNamesToCheck: Array<string>,
  ): Promise<boolean> {
    const found = await this.ClinicModel.find(
      { hostNames: { $in: hostNamesToCheck } },
      { limit: 1 },
    );

    return !!found && !!found.length;
  }
}
