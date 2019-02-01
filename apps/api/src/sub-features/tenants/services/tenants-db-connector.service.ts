import { ClinicsDbConnectorService } from '../../clinics/services/clinics-db-connector.service';
import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TENANT_SCHEMA_COLLECTION_NAME,
  TenantDocument,
} from '../db-schemas/tenant.db-schema';

@Injectable()
export class TenantsDbConnectorService {
  constructor(
    @InjectModel(TENANT_SCHEMA_COLLECTION_NAME)
    private readonly tenantModel: Model<TenantDocument>,
    private readonly clinicsDbConnectorService: ClinicsDbConnectorService,
  ) {}

  public async create(dto: CreateTenantInDto): Promise<TenantDocument> {
    const doc = new this.tenantModel(dto);

    await doc.save();

    return doc;
  }

  public async getById(id: string): Promise<TenantDocument | null> {
    return await this.tenantModel.findById(id).exec();
  }

  public async checkTenantWithGivenNameExists(name: string): Promise<boolean> {
    const found = await this.tenantModel.find({ name }, { limit: 1 }).exec();

    return !!found && !!found.length;
  }

  public async getByClinicId(clinicId: string): Promise<TenantDocument | null> {
    const clinic = await this.clinicsDbConnectorService.getById(clinicId);

    if (!clinic) {
      return null;
    }

    return await this.getById(clinic.tenant);
  }
}
