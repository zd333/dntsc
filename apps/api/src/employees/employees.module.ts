import { employeesEntitiesSchemas } from './mongoose-schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature(employeesEntitiesSchemas)],
})
export class EmployeesModule {}
