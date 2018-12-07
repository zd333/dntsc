import { ClinicsController } from './controllers/clinics.controller';
import { ClinicsDbConnectorService } from './services/clinics-db-connector.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CLINIC_SCHEMA_NAME,
  ClinicSchema,
} from './db-entities/clinic.db-entity';

const schemasMap = [
  {
    name: CLINIC_SCHEMA_NAME,
    schema: ClinicSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(schemasMap)],
  providers: [ClinicsDbConnectorService],
  controllers: [ClinicsController],
})
export class ClinicsModule {}
