import { ACGuard, UseRoles } from 'nest-access-control';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ClinicsDbConnectorService } from '../services/clinics-db-connector.service';
import { convertDocumentToOutDto } from '../../../sub-features/shared/helpers/convert-document-to-out-dto';
import { CreateClinicInDto } from '../dto/create-clinic.in-dto';
import { CreatedClinicOutDto } from '../dto/created-clinic.out-dto';

// TODO: add languageOptions property to clinic entity, sync with `AppLanguages` in client

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsDbConnector: ClinicsDbConnectorService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedClinicOutDto,
  })
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
