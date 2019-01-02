import { CreateInventoryBalanceChangeInDto } from '../dto/create-inventory-balance-change.in-dto';
import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { Document, Model } from 'mongoose';
import { getMongoFindCondition } from 'src/sub-features/shared/helpers/get-mongo-find-condition';
import { getPaginationMongoFindOptionsFromDto } from 'src/sub-features/shared/helpers/get-pagination-mongo-find-options-from-in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-balance-change.db-schema';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-item.db-schema';
import { MongoFindResults } from 'src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { QueryParamsForPaginatedListInDto } from 'src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';

@Injectable()
export class InventoryDbConnectorService {
  constructor(
    @InjectModel(INVENTORY_ITEM_SCHEMA_COLLECTION_NAME)
    private readonly inventoryItemModel: Model<Document>,
    @InjectModel(INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME)
    private readonly inventoryBalanceChange: Model<Document>,
  ) {}

  public async createItem(dto: CreateInventoryItemInDto): Promise<Document> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.inventoryItemModel({
      ...data,
      clinics: [targetClinicId],
    });

    return await doc.save();
  }

  public async getClinicItems(params: {
    readonly clinicId: string;
    readonly paginationParams?: QueryParamsForPaginatedListInDto;
  }): Promise<MongoFindResults> {
    const { clinicId, paginationParams } = params;
    const findOptions = getPaginationMongoFindOptionsFromDto(paginationParams);
    // Add search condition only if search string is present
    const findConditions = {
      clinics: clinicId,
      ...(paginationParams && paginationParams.searchString
        ? getMongoFindCondition({
            fieldName: 'name',
            searchString: paginationParams.searchString,
          })
        : {}),
    };

    const documents = await this.inventoryItemModel
      .find(findConditions, null, findOptions)
      .exec();
    const skipped = findOptions.skip || 0;
    const totalCount = findOptions.limit
      ? await this.inventoryItemModel.estimatedDocumentCount().exec()
      : skipped + documents.length;

    return { documents, skipped, totalCount };
  }

  public async createBalanceChange(
    dto: CreateInventoryBalanceChangeInDto,
  ): Promise<Document> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.inventoryBalanceChange({
      ...data,
      clinic: targetClinicId,
    });

    return await doc.save();
  }
}
