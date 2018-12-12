import { EmployeeDocument } from 'src/sub-features/employees/db-schemas/employee.db-schema';
import { EmployeesDbConnectorService } from 'src/sub-features/employees/services/employees-db-connector.service';
import { JwtService } from '@nestjs/jwt';
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
   * Does some employee verifications and returns JWT token if so.
   * Verifications:
   * * passed credentials are valid
   * * employee is active
   *
   * ? Validation logic could be implemented in dedicated validator, but better keep it here
   * because it is most important functionality of this service
   */
  public async signInEmployee(dto: SignInEmployeeInDto): Promise<string> {
    const employee = await this.employeesDbConnector.getByCredentials({
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

    // TODO: check credentials are valid and user is active
    const payload: JwtPayload = { employeeId: employee._id };
    const token = this.jwt.sign(payload);

    return token;
  }

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

// TODO: add everything is needed for convenient processing, e.g. permissions, etc.
export interface AuthenticatedUser {
  readonly isEmployee: boolean;
}

function convertEmployeeDocumentToAuthenticatedUser(
  document: EmployeeDocument,
): AuthenticatedUser {
  return {
    isEmployee: true,
  };
}
