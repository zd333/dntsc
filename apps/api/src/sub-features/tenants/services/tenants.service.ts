import { CreateTenantDto } from '../dto/create-tenant.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TENANT_SCHEMA_NAME, TenantDocument } from '../models/tenant.model';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(TENANT_SCHEMA_NAME)
    private readonly TenantModel: Model<TenantDocument>,
  ) {}

  public async create(
    createTenantDto: CreateTenantDto,
  ): Promise<TenantDocument> {
    const tenant = new this.TenantModel(createTenantDto);

    return (await tenant.save()) as TenantDocument;
  }
}
