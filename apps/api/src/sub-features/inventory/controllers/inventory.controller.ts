import { ACGuard, UseRoles } from 'nest-access-control';
import { AppRequest } from '../../../../src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentsToPaginatedListOutDto } from '../../../../src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { convertDocumentToOutDto } from '../../../../src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedInventoryItemOutDto } from '../dto/created-inventory-item.out-dto';
import { CreateInventoryBalanceChangeInDtoWithClinicContext } from '../dto/create-inventory-balance-change.in-dto';
import { CreateInventoryItemInDtoWithClinicContext } from '../dto/create-inventory-item.in-dto';
import { InventoryBalanceChangeDetailsOutDto } from '../dto/inventory-balance-change-details.out-dto';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { InventoryItemBalanceOutDto } from '../dto/inventory-item-balance.out-dto';
import { InventoryItemDetailsOutDto } from '../dto/inventory-item-details.out-dto';
import { PaginatedListOutDto } from '../../../../src/sub-features/shared/dto/paginated-list-out-dto.interface';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../../../src/sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from '../../../../src/sub-features/shared/guards/request-is-in-clinic-context.guard';
import { UpdateInventoryItemInDtoWithClinicContext } from '../dto/update-inventory-item.in-dto';
import { WithMongoIdInDto } from '../../../../src/sub-features/shared/dto/with-mongo-id.in-dto';
import {
  QueryParamsForSearchablePaginatedListInDto,
  QueryParamsForPaginatedListInDto,
} from '../../../../src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';
import {
  IsRelatedToFeatures,
  TenantFeaturesGuard,
} from '../../../../src/sub-features/shared/guards/tenant-features.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Req,
  Param,
  NotFoundException,
  Put,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';

@UseGuards(TenantFeaturesGuard)
@IsRelatedToFeatures('INVENTORY')
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
    @Body() dto: CreateInventoryItemInDtoWithClinicContext,
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
  public async getItems(
    @Req() req: AppRequest,
    @Query() dto: QueryParamsForSearchablePaginatedListInDto,
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

  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items/:id')
  public async getItem(@Param() { id }: WithMongoIdInDto): Promise<
    InventoryItemDetailsOutDto
  > {
    const document = await this.inventoryDbConnector.getItemById(id);

    if (!document) {
      throw new NotFoundException();
    }

    return convertDocumentToOutDto({
      document,
      dtoConstructor: InventoryItemDetailsOutDto,
    });
  }

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @UseRoles({
    resource: 'inventory-item',
    action: 'update',
    possession: 'any',
  })
  @Put('items/:id')
  @HttpCode(202)
  public async updateItem(
    @Param() { id }: WithMongoIdInDto,
    @Body() dto: UpdateInventoryItemInDtoWithClinicContext,
  ): Promise<void> {
    if (id !== dto.id) {
      throw new UnprocessableEntityException();
    }

    await this.inventoryDbConnector.updateItem({
      id,
      dto,
    });
  }

  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items/:id/current-balance')
  public async getItemBalance(@Param() { id }: WithMongoIdInDto): Promise<
    InventoryItemBalanceOutDto
  > {
    const balance = await this.inventoryDbConnector.getCurrentBalanceOfItem(id);

    return { balance };
  }

  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items/:id/balance-changes')
  public async getItemBalanceChanges(
    @Param() { id }: WithMongoIdInDto,
    @Query() dto: QueryParamsForPaginatedListInDto,
  ): Promise<PaginatedListOutDto<InventoryBalanceChangeDetailsOutDto>> {
    const findResults = await this.inventoryDbConnector.getBalanceChangesOfItem(
      {
        itemId: id,
        paginationParams: dto,
      },
    );

    return convertDocumentsToPaginatedListOutDto({
      findResults,
      singleDtoItemConstructor: InventoryBalanceChangeDetailsOutDto,
    });
  }

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @UseRoles({
    resource: 'inventory-balance-change',
    action: 'create',
    possession: 'any',
  })
  @Post('balance-changes')
  public async createBalanceChange(
    @Body() dto: CreateInventoryBalanceChangeInDtoWithClinicContext,
  ): Promise<void> {
    await this.inventoryDbConnector.createBalanceChange(dto);
  }
}
