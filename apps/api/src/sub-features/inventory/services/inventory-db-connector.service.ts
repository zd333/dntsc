import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { Document, Model } from 'mongoose';
import { getPaginationMongoFindOptionsFromDto } from 'src/sub-features/shared/helpers/ge-paginationt-mongo-find-options-from-in-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-item.db-schema';
import { MongoFindResults } from 'src/sub-features/shared/helpers/convert-documents-to-paginated-list-out-dto';
import { QueryParamsForPaginatedListInDto } from 'src/sub-features/shared/dto/query-params-for-paginated-list.in-dto';

@Injectable()
export class InventoryDbConnectorService {
  constructor(
    @InjectModel(INVENTORY_ITEM_SCHEMA_COLLECTION_NAME)
    private readonly InventoryItemModel: Model<Document>,
  ) {}

  public async createItem(dto: CreateInventoryItemInDto): Promise<Document> {
    const doc = new this.InventoryItemModel(dto);

    return await doc.save();
  }

  public async getClinicItems(params: {
    readonly clinicId: string;
    readonly paginationParams?: QueryParamsForPaginatedListInDto;
  }): Promise<MongoFindResults> {
    const findOptions = getPaginationMongoFindOptionsFromDto(
      params.paginationParams,
    );

    const documents = await this.InventoryItemModel.find(
      { clinics: params.clinicId },
      null,
      findOptions,
    ).exec();
    const skipped = findOptions.skip || 0;
    const totalCount = findOptions.limit
      ? await this.InventoryItemModel.estimatedDocumentCount().exec()
      : skipped + documents.length;

    return { documents, skipped, totalCount };
  }
}
