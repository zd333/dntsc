import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TENANT_SCHEMA_NAME } from '../db-entities/tenant.db-entity';

@Injectable()
export class TenantsDbConnectorService {
  constructor(
    @InjectModel(TENANT_SCHEMA_NAME)
    private readonly TenantModel: Model<Document>,
  ) {}

  public async create(dto: CreateTenantInDto): Promise<Document> {
    const doc = new this.TenantModel(dto);

    return await doc.save();
  }
}
