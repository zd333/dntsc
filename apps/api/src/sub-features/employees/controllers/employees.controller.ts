import { ACGuard, UseRoles } from 'nest-access-control';
import { AppRequest } from '../../../app.module';
import { AuthGuard } from '@nestjs/passport';
import { CheckEmployeeRegistrationTokenInDtoWithClinicContext } from '../dto/check-employee-registration-token.in-dto';
import { convertDocumentsToPaginatedListOutDto } from '../../shared/helpers/convert-documents-to-paginated-list-out-dto';
import { convertDocumentToOutDto } from '../../../sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedTenantOutDto } from '../../../sub-features/tenants/dto/created-tenant.out-dto';
import { EmployeeDetailsOutDto } from '../dto/employee-details.out-dto';
import { EmployeeRegistrationTokenOutDto } from '../dto/employee-registration-token.out-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { JwtService } from '@nestjs/jwt';
import { PaginatedListOutDto } from '../../shared/dto/paginated-list-out-dto.interface';
import { QueryParamsForSearchablePaginatedListInDto } from '../../shared/dto/query-params-for-paginated-list.in-dto';
import { RegisteredEmployeeOutDto } from '../dto/registered-employee.out-dto';
import { RegisterEmployeeInDtoWithClinicContext } from '../dto/register-employee.in-dto';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../../sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequesterIsPlatformOwnerIfProcessesClinicOwnerGuard } from '../guards/requester-is-platform-owner-if-processes-clinic-owner.guard';
import { RequestIsInClinicContextGuard } from '../../../sub-features/shared/guards/request-is-in-clinic-context.guard';
import { UpdateEmployeeInDtoWithClinicContext } from '../dto/update-employee.in-dto';
import { WithMongoIdInDto } from '../../../sub-features/shared/dto/with-mongo-id.in-dto';
import {
  CreateEmployeeRegistrationTokenInDtoWithClinicContext,
  CreateEmployeeRegistrationTokenInDto,
} from '../dto/create-employee-registration-token.in-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  UseGuards,
  Put,
  UnprocessableEntityException,
  Req,
  Query,
} from '@nestjs/common';

const EMPLOYEE_REGISTRATION_TOKEN_EXPIRATION_TIMEOUT_IN_SECONDS = 10800;

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
    private readonly jwt: JwtService,
  ) {}

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
    RequesterIsPlatformOwnerIfProcessesClinicOwnerGuard,
  )
  @UseRoles({
    resource: 'employee',
    action: 'create',
    possession: 'any',
  })
  @Post('create-registration-token')
  public createRegistrationToken(
    @Body() dto: CreateEmployeeRegistrationTokenInDtoWithClinicContext,
  ): EmployeeRegistrationTokenOutDto {
    const { targetClinicId: _, ...payload } = dto;
    const registrationToken = this.jwt.sign(payload, {
      expiresIn: EMPLOYEE_REGISTRATION_TOKEN_EXPIRATION_TIMEOUT_IN_SECONDS,
    });

    return { registrationToken };
  }

  /**
   * Client can use this endpoint to ensure that employee registration token is valid.
   * No payload in response, only response status code makes sense (OK or error).
   */
  @UseGuards(RequestIsInClinicContextGuard)
  @Post('check-registration-token')
  public async checkEmployeeRegistrationToken(
    // Underscore name to make TS compiler ignore unused var
    // DTO should be present even if not used to be decorated and processed by validators
    /* tslint:disable:variable-name */
    @Body() _dto: CheckEmployeeRegistrationTokenInDtoWithClinicContext,
  ): Promise<void> {}

  /**
   * Unauthenticated users can use this endpoint to register as employee.
   * No need for access-roles protection because this endpoint requires
   * valid registration token (protected by `IsNotExpiredJwtTokenValidator`)
   * which can be generated only by authorized employees,
   * see `createRegistrationToken`.
   */
  @UseGuards(RequestIsInClinicContextGuard)
  @Post('register')
  public async register(
    @Body() dto: RegisterEmployeeInDtoWithClinicContext,
  ): Promise<RegisteredEmployeeOutDto> {
    // Extract roles from token and mix them in
    // Do not validate roles, assume this is done during token generation (see `createRegistrationToken`)
    const registrationTokenPayload = this.jwt.verify<
      CreateEmployeeRegistrationTokenInDto
    >(dto.registrationToken);
    const roles = registrationTokenPayload && registrationTokenPayload.roles;
    const dtoWithRoles = {
      ...dto,
      ...(roles ? { roles } : {}),
    };
    const document = await this.employeesDbConnector.create(dtoWithRoles);

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

  @UseGuards(
    AuthGuard(),
    ACGuard,
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
    RequesterIsPlatformOwnerIfProcessesClinicOwnerGuard,
  )
  @UseRoles({
    resource: 'employee',
    action: 'update',
    possession: 'any',
  })
  @Put(':id')
  public async update(
    @Param() { id }: WithMongoIdInDto,
    @Body() dto: UpdateEmployeeInDtoWithClinicContext,
  ): Promise<void> {
    if (id !== dto.id) {
      throw new UnprocessableEntityException();
    }

    await this.employeesDbConnector.update({
      id,
      dto,
    });
  }

  @UseGuards(
    AuthGuard(),
    RequestIsInClinicContextGuard,
    RequesterIsEmployeeOfTargetClinicGuard,
  )
  @Get()
  public async getMultiple(
    @Req() req: AppRequest,
    @Query() dto: QueryParamsForSearchablePaginatedListInDto,
  ): Promise<PaginatedListOutDto<EmployeeDetailsOutDto>> {
    const { targetClinicId } = req;
    const findResults = await this.employeesDbConnector.getClinicEmployee({
      // Clinic id is not undefined for sure because of `RequestIsInClinicContextGuard`
      clinicId: targetClinicId as string,
      paginationParams: dto,
    });

    return convertDocumentsToPaginatedListOutDto({
      findResults,
      singleDtoItemConstructor: EmployeeDetailsOutDto,
    });
  }
}
