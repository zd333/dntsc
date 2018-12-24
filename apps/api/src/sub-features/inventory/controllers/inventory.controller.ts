import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import {
    Body,
    Controller,
    Post,
    UseGuards
    } from '@nestjs/common';
import { convertDocumentToOutDto } from 'src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedInventoryItemOutDto } from '../dto/created-inventory-item.out-dto';
import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { RequesterIsEmployeeOfTargetClinicGuard } from 'src/sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  @UseGuards(AuthGuard(), ACGuard, RequesterIsEmployeeOfTargetClinicGuard)
  @UseRoles({
    resource: 'inventory-item',
    action: 'create',
    possession: 'any',
  })
  @Post('create-item')
  public async createItem(
    @Body() dto: CreateInventoryItemInDto,
  ): Promise<CreatedInventoryItemOutDto> {
    const dbDoc = await this.inventoryDbConnector.createItem(dto);

    return convertDocumentToOutDto(CreatedInventoryItemOutDto, dbDoc);
  }
}
