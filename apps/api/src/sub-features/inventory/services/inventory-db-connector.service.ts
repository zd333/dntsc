import { CreateInventoryBalanceChangeInDtoWithClinicContext } from '../dto/create-inventory-balance-change.in-dto';
import { CreateInventoryItemInDtoWithClinicContext } from '../dto/create-inventory-item.in-dto';
import { Document, Model, Types } from 'mongoose';
import { getMongoFindConditionForFieldSearch } from '../../../../src/sub-features/shared/helpers/get-mongo-find-condition-for-field-search';
import { getPaginationMongoFindOptionsFromDto } from '../../../../src/sub-features/shared/helpers/get-pagination-mongo-find-options-from-in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoFindResults } from '../../../../src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { QueryParamsForSearchablePaginatedListInDto } from '../../../../src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';
import { runMongoPaginatedQueryWithAutoLimit } from '../../../../src/sub-features/shared/helpers/run-mongo-paginated-query-with-auto-limit';
import { UpdateInventoryItemInDtoWithClinicContext } from '../dto/update-inventory-item.in-dto';
import {
  INVENTORY_BALANCE_CHANGE_SCHEMA_COLLECTION_NAME,
  InventoryBalanceChangeDocument,
} from '../db-schemas/inventory-balance-change.db-schema';
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
    private readonly inventoryBalanceChangeModel: Model<
      InventoryBalanceChangeDocument
    >,
  ) {}

  public async createItem(
    dto: CreateInventoryItemInDtoWithClinicContext,
  ): Promise<InventoryItemDocument> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.inventoryItemModel({
      ...data,
      clinics: [targetClinicId],
    });

    await doc.save();

    return doc;
  }

  public async updateItem(params: {
    readonly id: string;
    readonly dto: UpdateInventoryItemInDtoWithClinicContext;
  }): Promise<void> {
    const { id, dto } = params;
    const { targetClinicId, id: idToStrip, ...dtoWithStrippedId } = dto;
    const dtoWithAlternates = {
      ...dtoWithStrippedId,
      ...(dtoWithStrippedId.alternates
        ? { alternates: dtoWithStrippedId.alternates }
        : { $unset: { alternates: undefined } }),
    };

    await this.inventoryItemModel.findByIdAndUpdate(id, dtoWithAlternates);
  }

  public async getItemById(id: string): Promise<InventoryItemDocument | null> {
    return await this.inventoryItemModel.findById(id).exec();
  }

  public async getClinicItems(params: {
    readonly clinicId: string | undefined;
    readonly paginationParams?: QueryParamsForSearchablePaginatedListInDto;
  }): Promise<MongoFindResults<InventoryItemDocument>> {
    const { clinicId, paginationParams } = params;
    const findOptions = getPaginationMongoFindOptionsFromDto(paginationParams);
    // Add search condition only if search string is present
    const findConditions = {
      clinics: clinicId,
      ...(paginationParams && paginationParams.searchString
        ? getMongoFindConditionForFieldSearch({
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
    readonly idToExclude?: string;
  }): Promise<boolean> {
    const { clinics, inventoryItemName, idToExclude } = params;
    const findConditions = {
      clinics: { $in: clinics },
      ...getMongoFindConditionForFieldSearch({
        fieldName: 'name',
        searchString: inventoryItemName,
      }),
      ...(idToExclude ? { _id: { $ne: idToExclude } } : {}),
    };
    const found = await this.inventoryItemModel
      .find(findConditions, { limit: 1 })
      .exec();

    return !!found && found.length > 0;
  }

  public async createBalanceChange(
    dto: CreateInventoryBalanceChangeInDtoWithClinicContext,
  ): Promise<Document> {
    const { targetClinicId, ...data } = dto;
    const doc = new this.inventoryBalanceChangeModel({
      ...data,
      clinic: targetClinicId,
    });

    return await doc.save();
  }

  public async getCurrentBalanceOfItem(id: string): Promise<number> {
    // Automatic casting is not done in aggregation queries
    const itemObjectId = Types.ObjectId(id);
    const result = await this.inventoryBalanceChangeModel
      .aggregate([
        { $match: { item: itemObjectId } },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    return Array.isArray(result) &&
      result.length === 1 &&
      !!result[0] &&
      typeof result[0].total === 'number'
      ? result[0].total
      : 0;
  }

  public async getBalanceChangesOfItem(params: {
    readonly itemId: string;
    readonly paginationParams?: QueryParamsForSearchablePaginatedListInDto;
  }): Promise<MongoFindResults<InventoryBalanceChangeDocument>> {
    const { itemId, paginationParams } = params;
    const findOptions = getPaginationMongoFindOptionsFromDto(paginationParams);
    const findConditions = {
      item: itemId,
    };

    return await runMongoPaginatedQueryWithAutoLimit({
      findConditions,
      findOptions,
      model: this.inventoryBalanceChangeModel,
    });
  }
}
