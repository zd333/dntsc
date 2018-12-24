import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { Document, Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-item.db-schema';

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
}
