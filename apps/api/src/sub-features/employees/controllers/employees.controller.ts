import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentToOutDto } from 'src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedEmployeeOutDto } from '../dto/created-employee.out-dto';
import { CreatedTenantOutDto } from 'src/sub-features/tenants/dto/created-tenant.out-dto';
import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { EmployeeDetailsOutDto } from '../dto/employee-details.out-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { GetByMongoIdParams } from 'src/validators/get-by-mongo-id-params.validated-class';
import { IsEmployeeGuard } from 'src/sub-features/shared/guards/is-employee.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  // TODO: only platform owners should be able to add platform owner and clinic owner roles
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: 'employee',
    action: 'create',
    possession: 'any',
  })
  @Post()
  public async create(
    @Body() dto: CreateEmployeeInDto,
  ): Promise<CreatedEmployeeOutDto> {
    const dbDoc = await this.employeesDbConnector.create(dto);

    return convertDocumentToOutDto(CreatedTenantOutDto, dbDoc);
  }

  @Get(':id')
  // Not sure if only employees are allowed to see details of employees, remove `IsEmployeeGuard` guard if so
  @UseGuards(AuthGuard(), IsEmployeeGuard)
  public async getById(@Param() { id }: GetByMongoIdParams) {
    const dbDoc = await this.employeesDbConnector.getById(id);

    if (!dbDoc) {
      throw new NotFoundException();
    }

    return convertDocumentToOutDto(EmployeeDetailsOutDto, dbDoc);
  }
}
