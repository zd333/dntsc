import { AppAccessRoles } from '../../../app-access-roles';
import { EmployeeDocument } from '../../../sub-features/employees/db-schemas/employee.db-schema';
import { EmployeesDbConnectorService } from '../../../../src/sub-features/employees/services/employees-db-connector.service';
import { hasRoles } from '../../../sub-features/shared/helpers/has-roles';
import { JwtService } from '@nestjs/jwt';
import { RefreshAuthInDtoWithClinicContext } from '../dto/refresh-auth.in-dto';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDtoWithClinicContext } from '../dto/sign-in-employee.in-dto';
import { SignInPlatformOwnerInDto } from '../dto/sign-in-platform-owner.in-dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

const TIME_TO_REFRESH_AUTH_TOKEN_AFTER_EXPIRATION = 1000;

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwt: JwtService,
    private readonly employeesDbConnector: EmployeesDbConnectorService,
    @Inject('USER_SESSION_EXPIRATION') private sessionExpirationTimeout: number,
  ) {}

  /**
   * This is used by auth controller to login employee.
   * Does some employee verifications and returns JWT token if so.
   * Verifications:
   * * passed credentials are valid
   * * employee is active
   *
   * ? Validation logic could be implemented in dedicated validator, but better keep it here
   * because it is most important functionality of this service.
   */
  public async signInEmployee(
    dto: SignInEmployeeInDtoWithClinicContext,
  ): Promise<SignedInEmployeeOutDto> {
    const employee = await this.employeesDbConnector.getByCredentials({
      clinicId: dto.targetClinicId,
      login: dto.login,
      password: dto.password,
    });

    if (!employee) {
      // Credentials do not match
      throw new UnauthorizedException();
    }

    if (!employee.isActive) {
      throw new ForbiddenException();
    }

    const payload: JwtPayload = { employeeId: employee._id };
    const authToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.getRefreshTokenTimeout(),
    });
    const { hasToChangePassword, roles, name } = employee;

    return { authToken, refreshToken, hasToChangePassword, roles, name };
  }

  /**
   * Almost same as `signInEmployee` but requires no clinic id
   * (platform owners can sign in without clinic context).
   */
  public async signInPlatformOwner(
    dto: SignInPlatformOwnerInDto,
  ): Promise<SignedInEmployeeOutDto> {
    const employee = await this.employeesDbConnector.getByCredentials({
      login: dto.login,
      password: dto.password,
    });
    if (!employee) {
      // Credentials do not match
      throw new UnauthorizedException();
    }

    const isActivePlatformOwner =
      employee.isActive &&
      hasRoles({ target: employee, roles: ['_PLATFORM_OWNER'] });
    if (!isActivePlatformOwner) {
      throw new ForbiddenException();
    }

    const payload: JwtPayload = { employeeId: employee._id };
    const authToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.getRefreshTokenTimeout(),
    });
    const { roles, name } = employee;

    return { authToken, refreshToken, roles, name };
  }

  /**
   * This is used by Passport, see `JwtPassportStrategy`.
   * Currently supports only employee users.
   */
  public async validateUserByJwtPayload(
    payload: JwtPayload,
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

  public async refreshAuth(
    dto: RefreshAuthInDtoWithClinicContext,
  ): Promise<SignedInEmployeeOutDto> {
    if (!dto || !dto.refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = this.jwt.verify<JwtPayload>(dto.refreshToken);
    const { employeeId } = payload;
    const employee = await this.employeesDbConnector.getById(employeeId);
    if (!employee) {
      throw new UnauthorizedException();
    }
    if (!employee.isActive) {
      throw new ForbiddenException();
    }
    const isPlatformOwner = hasRoles({
      target: employee,
      roles: ['_PLATFORM_OWNER'],
    });
    const authToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.getRefreshTokenTimeout(),
    });
    const { hasToChangePassword, roles, name } = employee;

    return {
      authToken,
      refreshToken,
      roles,
      name,
      ...(isPlatformOwner ? {} : { hasToChangePassword }),
    };
  }

  private getRefreshTokenTimeout(): number {
    return (
      this.sessionExpirationTimeout +
      TIME_TO_REFRESH_AUTH_TOKEN_AFTER_EXPIRATION
    );
  }
}

export interface JwtPayload {
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
