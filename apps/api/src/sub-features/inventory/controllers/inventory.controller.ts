import { ACGuard, UseRoles } from 'nest-access-control';
import { ApiResponse } from '@nestjs/swagger';
import { AppRequest } from '../../../app.module';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentsToPaginatedListOutDto } from '../../../sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { convertDocumentToOutDto } from '../../../sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedInventoryItemOutDto } from '../dto/created-inventory-item.out-dto';
import { CreateInventoryBalanceChangeInDtoWithClinicContext } from '../dto/create-inventory-balance-change.in-dto';
import { CreateInventoryItemInDtoWithClinicContext } from '../dto/create-inventory-item.in-dto';
import { InventoryBalanceChangeDetailsOutDto } from '../dto/inventory-balance-change-details.out-dto';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { InventoryItemBalanceOutDto } from '../dto/inventory-item-balance.out-dto';
import { InventoryItemDetailsOutDto } from '../dto/inventory-item-details.out-dto';
import { InventoryItemsSearchParams } from '../dto/inventory-items-search-params.in-dto';
import { InventoryItemsTagsOutDto } from '../dto/inventory-items-tags.out-dto';
import { PaginatedListOutDto } from '../../../sub-features/shared/dto/paginated-list-out-dto.interface';
import { QueryParamsForPaginatedListInDto } from '../../../sub-features/shared/dto/query-params-for-paginated-list.in-dto';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../../sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from '../../../sub-features/shared/guards/request-is-in-clinic-context.guard';
import { UpdateInventoryItemInDtoWithClinicContext } from '../dto/update-inventory-item.in-dto';
import { WithMongoIdInDto } from '../../../sub-features/shared/dto/with-mongo-id.in-dto';
import {
  IsRelatedToFeatures,
  TenantFeaturesGuard,
} from '../../../sub-features/shared/guards/tenant-features.guard';
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
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';

@UseGuards(TenantFeaturesGuard)
@IsRelatedToFeatures('INVENTORY')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedInventoryItemOutDto,
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: InventoryItemDetailsOutDto,
    description: `
      Note, results are array are wrapped in PaginatedListOutDto,
      can not document due to lack of generics support in NestJS Swagger.
    `,
  })
  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items')
  public async getItems(
    @Req() req: AppRequest,
    @Query() dto: InventoryItemsSearchParams,
  ): Promise<PaginatedListOutDto<InventoryItemDetailsOutDto>> {
    const { targetClinicId } = req;
    const filterTags = (dto && dto.tags && dto.tags.split(',')) || undefined;
    const filterAlternatesOfItemId = dto && dto.alternates_of;
    const filterUnit = dto && dto.unit;
    const findResults = await this.inventoryDbConnector.getClinicItems({
      filterTags,
      filterAlternatesOfItemId,
      filterUnit,
      clinicId: targetClinicId,
      paginationParams: dto,
    });

    return convertDocumentsToPaginatedListOutDto({
      findResults,
      singleDtoItemConstructor: InventoryItemDetailsOutDto,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: InventoryItemsTagsOutDto,
  })
  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get('items-tags')
  public async getItemsTags(
    @Req() req: AppRequest,
  ): Promise<InventoryItemsTagsOutDto> {
    const { targetClinicId } = req;
    const items = await this.inventoryDbConnector.getClinicItems({
      clinicId: targetClinicId,
    });
    const tags = items.documents
      .map(doc => doc.tags || [])
      .reduce((result, current) => [...result, ...current], []);
    const uniqueTags = Array.from(new Set(tags).values());

    return { usedTags: uniqueTags };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: InventoryItemDetailsOutDto,
  })
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

  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: InventoryItemBalanceOutDto,
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: InventoryBalanceChangeDetailsOutDto,
    description: `
      Note, results are array are wrapped in PaginatedListOutDto,
      can not document due to lack of generics support in NestJS Swagger.
    `,
  })
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

  @ApiResponse({
    status: HttpStatus.CREATED,
  })
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
