import { CLINIC_SCHEMA_NAME, ClinicDocument } from '../models/clinic.model';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectModel(CLINIC_SCHEMA_NAME)
    private readonly ClinicModel: Model<ClinicDocument>,
  ) {}

  public async create(
    createClinicDto: CreateClinicDto,
  ): Promise<ClinicDocument> {
    const clinic = new this.ClinicModel(createClinicDto);

    return (await clinic.save()) as ClinicDocument;
  }
}
