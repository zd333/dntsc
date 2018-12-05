import { CLINIC_SCHEMA_NAME, ClinicSchema } from './models/clinic.model';
import { ClinicsService } from './services/clinics.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const schemasMap = [
  {
    name: CLINIC_SCHEMA_NAME,
    schema: ClinicSchema,
  },
];

@Module({
  providers: [ClinicsService],
  imports: [MongooseModule.forFeature(schemasMap)],
})
export class ClinicsModule {}
