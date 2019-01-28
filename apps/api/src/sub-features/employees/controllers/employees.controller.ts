import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentToOutDto } from '../../../../src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedEmployeeOutDto } from '../dto/created-employee.out-dto';
import { CreatedTenantOutDto } from '../../../../src/sub-features/tenants/dto/created-tenant.out-dto';
import { CreateEmployeeInDtoWithClinicContext } from '../dto/create-employee.in-dto';
import { EmployeeDetailsOutDto } from '../dto/employee-details.out-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../../../src/sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard } from '../guards/requester-is-platform-owner-if-creates-clinic-owner.guard';
import { RequestIsInClinicContextGuard } from '../../../../src/sub-features/shared/guards/request-is-in-clinic-context.guard';
import { WithMongoIdInDto } from '../../../../src/sub-features/shared/dto/with-mongo-id.in-dto';
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

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
    RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard,
  )
  @UseRoles({
    resource: 'employee',
    action: 'create',
    possession: 'any',
  })
  @Post()
  public async create(
    @Body() dto: CreateEmployeeInDtoWithClinicContext,
  ): Promise<CreatedEmployeeOutDto> {
    const document = await this.employeesDbConnector.create(dto);

    return convertDocumentToOutDto({
      document,
      dtoConstructor: CreatedTenantOutDto,
    });
  }

  @Get(':id')
  // Not sure if only employees are allowed to see details of employees, remove `IsEmployeeGuard` guard if so
  @UseGuards(AuthGuard(), RequesterIsEmployeeOfTargetClinicGuard)
  public async getById(@Param() { id }: WithMongoIdInDto): Promise<
    EmployeeDetailsOutDto
  > {
    const document = await this.employeesDbConnector.getById(id);

    if (!document) {
      throw new NotFoundException();
    }

    return convertDocumentToOutDto({
      document,
      dtoConstructor: EmployeeDetailsOutDto,
    });
  }
}
