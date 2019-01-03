import { ClinicsController } from './controllers/clinics.controller';
import { ClinicsDbConnectorService } from './services/clinics-db-connector.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotUsedClinicHostNames } from './validators/not-used-clinic-host-names.validator';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import {
  CLINIC_SCHEMA_COLLECTION_NAME,
  ClinicSchema,
} from './db-schemas/clinic.db-schema';

const schemasMap = [
  {
    name: CLINIC_SCHEMA_COLLECTION_NAME,
    collection: CLINIC_SCHEMA_COLLECTION_NAME,
    schema: ClinicSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => SharedModule),
  ],
  providers: [ClinicsDbConnectorService, NotUsedClinicHostNames],
  controllers: [ClinicsController],
  exports: [ClinicsDbConnectorService],
})
export class ClinicsModule {}
