import { AppRequest } from 'src/app.module';
import { ClinicsDbConnectorService } from 'src/sub-features/clinics/services/clinics-db-connector.service';
import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

/**
 * Helps to associate request and its body (if any) with particular clinic.
 * Checks request host name and adds `clinicId` property with id
 * of corresponding clinic to request object.
 */
@Injectable()
export class AddClinicContextMiddleware implements NestMiddleware {
  constructor(private readonly clinicsDbConnector: ClinicsDbConnectorService) {}

  resolve(): MiddlewareFunction {
    return async (req: AppRequest, res, next) => {
      const hostName = req.header('host');
      const targetClinicId = await this.clinicsDbConnector.getClinicIdByHostName(
        {
          hostName,
        },
      );

      if (targetClinicId) {
        req.targetClinicId = targetClinicId;

        if (typeof req.body === 'object') {
          // Mix in clinic id to body DTO
          req.body.targetClinicId = targetClinicId;
        }
      }

      next();
    };
  }
}

/**
 * Use this class as base for all in-DTOs that need clinic context.
 * !Not this must be optional so that it never returns confusing validation errors.
 * !Thus you have to check if request id in clinic context manually (use `RequestIsInClinicContextGuard`).
 */
export class InDtoWithClinicContext {
  @IsOptional()
  @IsString()
  readonly targetClinicId: string;
}
