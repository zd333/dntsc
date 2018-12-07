import { convertDocumentToOutDto } from 'src/shared/helpers/convert-document-to-out-dto.helper';
import { CreatedEmployeeOutDto } from '../dto/created-employee.out-dto';
import { CreatedTenantOutDto } from 'src/sub-features/tenants/dto/created-tenant.out-dto';
import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { EmployeeDetailsOutDto } from '../dto/employee-details.out-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  // TODO: protect with `platform_owner` ACL
  // TODO: wraps db connector calls in try-catch,
  // TODO: Add Mongo error verification and conversion to class-validation format,
  // TODO: check unique mongo error, object id cast mongo error, ...
  // TODO: check clinic id exist
  // TODO: check that none of passed clinics do not have target login yet (login must be unique for clinic)
  @Post()
  async create(
    @Body() dto: CreateEmployeeInDto,
  ): Promise<CreatedEmployeeOutDto> {
    const dbDoc = await this.employeesDbConnector.create(dto);

    return convertDocumentToOutDto(CreatedTenantOutDto, dbDoc);
  }

  @Get(':id')
  async getById(@Param('id') id) {
    const dbDoc = await this.employeesDbConnector.getById(id);

    if (!dbDoc) {
      throw new NotFoundException();
    }

    return convertDocumentToOutDto(EmployeeDetailsOutDto, dbDoc);
  }
}
