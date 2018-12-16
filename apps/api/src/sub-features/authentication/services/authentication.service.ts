import { EmployeeDocument } from 'src/sub-features/employees/db-schemas/employee.db-schema';
import { EmployeesDbConnectorService } from 'src/sub-features/employees/services/employees-db-connector.service';
import { JwtService } from '@nestjs/jwt';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDto } from '../dto/sign-in-employee.in-dto';
import { Types } from 'mongoose';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwt: JwtService,
    private readonly employeesDbConnector: EmployeesDbConnectorService,
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
    dto: SignInEmployeeInDto,
    clinicId: Types.ObjectId,
  ): Promise<SignedInEmployeeOutDto> {
    const employee = await this.employeesDbConnector.getByCredentials({
      clinicId,
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
    const { hasToChangePassword } = employee;

    return { authToken, hasToChangePassword };
  }

  /**
   * This is used by Passport, see `JwtPassportStrategy`.
   * Currently supports only employee users.
   */
  public async validateUserByJwtPayload(
    payload: JwtPayload,
  ): Promise<AuthenticatedUser | undefined> {
    if (!payload || !payload.employeeId) {
      return;
    }

    const employee = await this.employeesDbConnector.getById(
      payload.employeeId,
    );
    if (!employee) {
      return;
    }

    return convertEmployeeDocumentToAuthenticatedUser(employee);
  }
}

export interface JwtPayload {
  readonly employeeId: Types.ObjectId;
}

/**
 * Property `user` with value that follows this interface is added to each authenticated
 * (signed with auth credentials) request.
 * TODO: add permissions.
 */
export interface AuthenticatedUser {
  readonly isEmployee: boolean;
}

/**
 * This a stub now, will be refactored while `AuthenticatedUser` gets more properties.
 */
function convertEmployeeDocumentToAuthenticatedUser(
  document: EmployeeDocument,
): AuthenticatedUser {
  return {
    isEmployee: true,
  };
}
