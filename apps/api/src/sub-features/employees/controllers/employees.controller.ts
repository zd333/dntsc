import { ACGuard, UseRoles } from 'nest-access-control';
import { addSeconds } from 'date-fns';
import { AuthGuard } from '@nestjs/passport';
import { convertDocumentToOutDto } from '../../../../src/sub-features/shared/helpers/convert-document-to-out-dto';
import { CreatedTenantOutDto } from '../../../../src/sub-features/tenants/dto/created-tenant.out-dto';
import { CreateEmployeeRegistrationTokenInDtoWithClinicContext } from '../dto/create-employee-registration-token.in-dto';
import { EmployeeDetailsOutDto } from '../dto/employee-details.out-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { JwtService } from '@nestjs/jwt';
import { RegisteredEmployeeOutDto } from '../dto/registered-employee.out-dto';
import { RegisterEmployeeInDtoWithClinicContext } from '../dto/register-employee.in-dto';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../../../src/sub-features/shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard } from '../guards/requester-is-platform-owner-if-creates-clinic-owner.guard';
import { RequestIsInClinicContextGuard } from '../../../../src/sub-features/shared/guards/request-is-in-clinic-context.guard';
import { WithMongoIdInDto } from '../../../../src/sub-features/shared/dto/with-mongo-id.in-dto';
import {
  EmployeeRegistrationTokenOutDto,
  JwtEmployeeRegistrationTokenPayload,
} from '../dto/employee-registration-token.out-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

const EMPLOYEE_REGISTRATION_TOKEN_EXPIRATION_TIMEOUT_IN_SECONDS = 600;

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
    RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard,
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
    const expiration = addSeconds(
      Date.now(),
      EMPLOYEE_REGISTRATION_TOKEN_EXPIRATION_TIMEOUT_IN_SECONDS,
    ).toISOString();
    const { targetClinicId: _, ...payload } = dto;
    const registrationToken = this.jwt.sign(payload, {
      expiresIn: EMPLOYEE_REGISTRATION_TOKEN_EXPIRATION_TIMEOUT_IN_SECONDS,
    });

    return { registrationToken, expiration };
  }

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
    console.log('******');
    console.log(dto);
    const registrationTokenPayload = this.jwt.verify<
      JwtEmployeeRegistrationTokenPayload
    >(dto.registrationToken);
    const roles = registrationTokenPayload && registrationTokenPayload.roles;
    const dtoWithRoles = {
      ...dto,
      ...(roles ? roles : {}),
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
}
