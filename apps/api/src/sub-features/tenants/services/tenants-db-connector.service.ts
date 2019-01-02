import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TENANT_SCHEMA_COLLECTION_NAME } from '../db-schemas/tenant.db-schema';

@Injectable()
export class TenantsDbConnectorService {
  constructor(
    @InjectModel(TENANT_SCHEMA_COLLECTION_NAME)
    private readonly tenantModel: Model<Document>,
  ) {}

  public async create(dto: CreateTenantInDto): Promise<Document> {
    const doc = new this.tenantModel(dto);

    return await doc.save();
  }

  public async getById(id: string): Promise<Document | null> {
    return await this.tenantModel.findById(id).exec();
  }

  public async checkTenantWithGivenNameExists(name: string): Promise<boolean> {
    const found = await this.tenantModel.find({ name }, { limit: 1 }).exec();

    return !!found && !!found.length;
  }
}
