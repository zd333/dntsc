import { Tenant } from '../models/tenant.model';

export class CreateTenantDto {
  readonly name: Tenant['name'];
}
