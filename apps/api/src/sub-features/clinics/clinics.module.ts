import { ClinicsController } from './controllers/clinics.controller';
import { ClinicsDbConnectorService } from './services/clinics-db-connector.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  CLINIC_SCHEMA_NAME,
  ClinicSchema,
} from './db-schemas/clinic.db-schema';

const schemasMap = [
  {
    name: CLINIC_SCHEMA_NAME,
    schema: ClinicSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ClinicsDbConnectorService],
  controllers: [ClinicsController],
})
export class ClinicsModule {}