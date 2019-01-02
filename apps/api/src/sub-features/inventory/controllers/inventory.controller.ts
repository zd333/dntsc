import { ACGuard, UseRoles } from 'nest-access-control';
import { AppRequest } from 'src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentsToPaginatedListOutDto } from 'src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { convertDocumentToOutDto } from 'src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedInventoryItemOutDto } from '../dto/created-inventory-item.out-dto';
import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { InventoryItemDetailsOutDto } from '../dto/inventory-item-details.out-dto';
import { PaginatedListOutDto } from 'src/sub-features/shared/dto/paginated-list-out-dto.interface';
import { QueryParamsForPaginatedListInDto } from 'src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';
import { RequesterIsEmployeeOfTargetClinicGuard } from 'src/sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from 'src/sub-features/shared/guards/request-is-in-clinic-context.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @UseRoles({
    resource: 'inventory-item',
    action: 'create',
    possession: 'any',
  })
  @Post('items')
  public async createItem(
    @Body() dto: CreateInventoryItemInDto,
  ): Promise<CreatedInventoryItemOutDto> {
    const document = await this.inventoryDbConnector.createItem(dto);

    return convertDocumentToOutDto({
      document,
      dtoConstructor: CreatedInventoryItemOutDto,
    });
  }

  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items')
  public async getAll(
    @Req() req: AppRequest,
    @Query() dto: QueryParamsForPaginatedListInDto,
  ): Promise<PaginatedListOutDto<InventoryItemDetailsOutDto>> {
    const { targetClinicId } = req;
    const findResults = await this.inventoryDbConnector.getClinicItems({
      clinicId: targetClinicId,
      paginationParams: dto,
    });

    return convertDocumentsToPaginatedListOutDto({
      findResults,
      singleDtoItemConstructor: InventoryItemDetailsOutDto,
    });
  }
}
