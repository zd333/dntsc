import { CreateInventoryBalanceChangeInDto } from '../dto/create-inventory-balance-change.in-dto';
import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { Document, Model } from 'mongoose';
import { getMongoFindCondition } from 'src/sub-features/shared/helpers/get-mongo-find-condition';
import { getPaginationMongoFindOptionsFromDto } from 'src/sub-features/shared/helpers/get-pagination-mongo-find-options-from-in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-balance-change.db-schema';
import { MongoFindResults } from 'src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { QueryParamsForPaginatedListInDto } from 'src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';
import {
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  InventoryItemDocument,
} from '../db-schemas/inventory-item.db-schema';

@Injectable()
export class InventoryDbConnectorService {
  constructor(
    @InjectModel(INVENTORY_ITEM_SCHEMA_COLLECTION_NAME)
    private readonly inventoryItemModel: Model<InventoryItemDocument>,
    @InjectModel(INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME)
    private readonly inventoryBalanceChange: Model<Document>,
  ) {}

  public async createItem(
    dto: CreateInventoryItemInDto,
  ): Promise<InventoryItemDocument> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.inventoryItemModel({
      ...data,
      clinics: [targetClinicId],
    });

    await doc.save();

    return doc;
  }

  public async getById(id: string): Promise<InventoryItemDocument | null> {
    return await this.inventoryItemModel.findById(id).exec();
  }

  public async getClinicItems(params: {
    readonly clinicId: string;
    readonly paginationParams?: QueryParamsForPaginatedListInDto;
  }): Promise<MongoFindResults<InventoryItemDocument>> {
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

  /**
   * Checks if there is inventory item document with given name and on of the given clinic ids.
   * Name check is case insensitive.
   */
  public async checkInventoryItemWithGivenNameExistsInClinic(params: {
    readonly inventoryItemName: string;
    readonly clinics: Array<string>;
  }): Promise<boolean> {
    const { clinics, inventoryItemName } = params;
    const findConditions = {
      clinics: { $in: clinics },
      ...getMongoFindCondition({
        fieldName: 'name',
        searchString: inventoryItemName,
      }),
    };
    const found = await this.inventoryItemModel
      .find(findConditions, { limit: 1 })
      .exec();

    return !!found && found.length > 0;
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
