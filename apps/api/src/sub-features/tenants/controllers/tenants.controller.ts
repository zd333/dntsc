import { ACGuard, UseRoles } from 'nest-access-control';
import { ApiResponse } from '@nestjs/swagger';
import { AppRequest } from '../../../app.module';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentToOutDto } from '../../../sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedTenantOutDto } from '../dto/created-tenant.out-dto';
import { CreateTenantInDto } from '../dto/create-tenant.in-dto';
import { RequestIsInClinicContextGuard } from '../../shared/guards/request-is-in-clinic-context.guard';
import { TenantDetailsOutDto } from '../dto/tenant-details.out-dto';
import { TenantsDbConnectorService } from '../services/tenants-db-connector.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsDbConnector: TenantsDbConnectorService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedTenantOutDto,
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tenant is resolved via clinic host.',
    type: TenantDetailsOutDto,
  })
  @UseGuards(RequestIsInClinicContextGuard)
  @Get('clinic_tenant')
  public async getItems(@Req() req: AppRequest): Promise<TenantDetailsOutDto> {
    const { targetClinicId } = req;
    const document = await this.tenantsDbConnector.getByClinicId(
      targetClinicId as string,
    );

    if (!document) {
      // Shouldn't happen, something is definitely wrong :(
      throw new NotFoundException();
    }

    return convertDocumentToOutDto({
      document,
      dtoConstructor: TenantDetailsOutDto,
    });
  }
}
