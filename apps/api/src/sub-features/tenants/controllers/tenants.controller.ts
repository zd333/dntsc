import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Post,
  UseGuards
  } from '@nestjs/common';
import { convertDocumentToOutDto } from 'src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedTenantOutDto } from '../dto/created-tenant.out-dto';
import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { TenantsDbConnectorService } from '../services/tenants-db-connector.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsDbConnector: TenantsDbConnectorService) {}

  // TODO: protect with `platform_owner` ACL
  @Post()
  @UseGuards(AuthGuard())
  public async create(
    @Body() dto: CreateTenantInDto,
  ): Promise<CreatedTenantOutDto> {
    const dbDoc = await this.tenantsDbConnector.create(dto);

    return convertDocumentToOutDto(CreatedTenantOutDto, dbDoc);
  }
}
