import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClinicsDbConnectorService } from '../services/clinics-db-connector.service';
import { convertDocumentToOutDto } from '../../../../src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { CreatedClinicOutDto } from '../dto/created-clinic.out-dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsDbConnector: ClinicsDbConnectorService) {}

  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: 'clinic',
    action: 'create',
    possession: 'any',
  })
  @Post()
  public async create(
    @Body() dto: CreateClinicInDto,
  ): Promise<CreatedClinicOutDto> {
    const document = await this.clinicsDbConnector.create(dto);

    return convertDocumentToOutDto({
      document,
      dtoConstructor: CreatedClinicOutDto,
    });
  }
}
