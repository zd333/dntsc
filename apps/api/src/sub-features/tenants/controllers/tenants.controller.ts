import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { convertDocumentToOutDto } from '../../../../src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedTenantOutDto } from '../dto/created-tenant.out-dto';
import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { TenantsDbConnectorService } from '../services/tenants-db-connector.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsDbConnector: TenantsDbConnectorService) {}

  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: 'tenant',
    action: 'create',
    possession: 'any',
  })
  @Post()
  public async create(
    @Body() dto: CreateTenantInDto,
  ): Promise<CreatedTenantOutDto> {
    const document = await this.tenantsDbConnector.create(dto);

    return convertDocumentToOutDto({
      document,
      dtoConstructor: CreatedTenantOutDto,
    });
  }
}
