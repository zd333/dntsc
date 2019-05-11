import { AppAccessRoles } from '../../../app-access-roles';
import { EmployeeDocument } from '../../../sub-features/employees/db-schemas/employee.db-schema';
import { EmployeesDbConnectorService } from '../../../sub-features/employees/services/employees-db-connector.service';
import { hasRoles } from '../../../sub-features/shared/helpers/has-roles';
import { isInDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { JwtService } from '@nestjs/jwt';
import { RefreshAuthInDtoWithClinicContext } from '../dto/refresh-auth.in-dto';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import {
  SignInEmployeeInDtoWithClinicContext,
  SignInPlatformOwnerInDto,
} from '../dto/sign-in-employee.in-dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwt: JwtService,
    private readonly employeesDbConnector: EmployeesDbConnectorService,
    @Inject('USER_SESSION_EXPIRATION_IN_SECONDS')
    private readonly sessionExpirationTimeout: number,
  ) {}

  /**
   * This is used by auth controller to login employee (including platform owners).
   * Does some employee verifications and returns JWT token if so.
   * Verifications:
   * * passed credentials are valid
   * * employee is active
   *
   * ? Validation logic could be implemented in dedicated validator, but better keep it here
   * because it is most important functionality of this service.
   */
  public async signInEmployee(
    dto: SignInEmployeeInDtoWithClinicContext | SignInPlatformOwnerInDto,
  ): Promise<SignedInEmployeeOutDto> {
    const employee = await this.employeesDbConnector.getByCredentials({
      login: dto.login,
      password: dto.password,
    });

    if (!employee) {
      // Credentials do not match
      throw new UnauthorizedException();
    }

    if (
      // Credentials do not match and thus employee is not found
      !employee ||
      // This is not platform owner and request is done from clinic context which does not belong to clinics of target user
      (!hasRoles({
        target: employee,
        roles: ['_PLATFORM_OWNER'],
      }) &&
        (!isInDtoWithClinicContext(dto) ||
          !employee.clinics.find(
            employeeClinic =>
              employeeClinic.toHexString() === dto.targetClinicId,
          ))) ||
      !employee.isActive
    ) {
      throw new ForbiddenException();
    }

    const payload: JwtAuthTokenPayload = { employeeId: employee._id };
    const authToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      // Use exact timeout value, auth token will expire earlier, see `AuthenticationModule`
      expiresIn: this.sessionExpirationTimeout,
    });
    const { roles, name } = employee;

    return { authToken, refreshToken, roles, name };
  }

  /**
   * This is used by Passport, see `JwtPassportStrategy`.
   * Currently supports only employee users.
   */
  public async validateUserByJwtPayload(
    payload: JwtAuthTokenPayload,
  ): Promise<AuthenticatedUser | undefined> {
    if (!payload || !payload.employeeId) {
      return undefined;
    }

    const employee = await this.employeesDbConnector.getById(
      payload.employeeId,
    );
    if (!employee || !employee.isActive) {
      return undefined;
    }

    return convertEmployeeDocumentToAuthenticatedUser(employee);
  }

  public async refreshEmployeeAuthToken(
    dto: RefreshAuthInDtoWithClinicContext,
  ): Promise<SignedInEmployeeOutDto> {
    if (!dto || !dto.refreshToken) {
      throw new UnauthorizedException();
    }

    let dtoPayload: JwtAuthTokenPayload;
    try {
      dtoPayload = this.jwt.verify<JwtAuthTokenPayload>(dto.refreshToken);
    } catch (e) {
      throw new UnauthorizedException();
    }

    const { employeeId } = dtoPayload;
    const employee = await this.employeesDbConnector.getById(employeeId);

    if (!employee) {
      throw new UnauthorizedException();
    }
    if (!employee.isActive) {
      throw new ForbiddenException();
    }

    // Do not use dtoPayload due to it contains props added by jwt service
    const resultPayload = { employeeId };
    const authToken = this.jwt.sign(resultPayload);
    const refreshToken = this.jwt.sign(resultPayload, {
      // Use exact timeout value, auth token will expire earlier, see `AuthenticationModule`
      expiresIn: this.sessionExpirationTimeout,
    });
    const { roles, name } = employee;

    return {
      authToken,
      refreshToken,
      roles,
      name,
    };
  }
}

export interface JwtAuthTokenPayload {
  readonly employeeId: string;
}

/**
 * Property `user` with value that follows this interface is added to each authenticated
 * (signed with auth credentials) request.
 */
export interface AuthenticatedUser {
  readonly isEmployee: boolean;
  readonly roles?: Array<AppAccessRoles>;
  readonly clinics?: Array<string>;
}

/**
 * This a stub now, will be refactored while `AuthenticatedUser` gets more properties.
 */
function convertEmployeeDocumentToAuthenticatedUser(
  employeeDocument: EmployeeDocument,
): AuthenticatedUser {
  const roles: Array<AppAccessRoles> =
    employeeDocument.roles && employeeDocument.roles.length
      ? employeeDocument.roles
      : ['_BASIC_PERMISSIONS'];
  const isPlatformOwner = hasRoles({
    target: employeeDocument,
    roles: ['_PLATFORM_OWNER'],
  });
  const clinics = employeeDocument.clinics.map(c => c.toHexString()) || [];

  return {
    roles,
    isEmployee: true,
    // Do not add clinics to platform owner, he has access to all clinics
    ...(isPlatformOwner ? {} : { clinics }),
  };
}
