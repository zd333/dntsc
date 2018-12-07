import { Body, Controller, Post } from '@nestjs/common';
import { ClinicsDbConnectorService } from '../services/clinics-db-connector.service';
import { convertDocumentToOutDto } from 'src/shared/helpers/convert-document-to-out-dto.helper';
import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { CreatedClinicOutDto } from '../dto/created-clinic.out-dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsDbConnector: ClinicsDbConnectorService) {}

  // TODO: protect with `platform_owner` ACL
  // TODO: add Mongo error verification and conversion to class-validation format
  @Post()
  async create(@Body() dto: CreateClinicInDto): Promise<CreatedClinicOutDto> {
    const dbDoc = await this.clinicsDbConnector.create(dto);

    return convertDocumentToOutDto(CreatedClinicOutDto, dbDoc);
  }
}
