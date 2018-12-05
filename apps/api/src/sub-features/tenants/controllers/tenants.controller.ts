import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { TenantsService } from '../services/tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // TODO: protect with `platform_owner` ACL
  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }
}
