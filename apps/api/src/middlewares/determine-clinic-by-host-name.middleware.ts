import { ClinicsDbConnectorService } from 'src/sub-features/clinics/services/clinics-db-connector.service';
import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

/**
 * Helps to associate request with particular clinic.
 * Checks request host name and adds `clinicId` property with id
 * of corresponding clinic to request object.
 */
@Injectable()
export class DetermineClinicByHostNameMiddleware implements NestMiddleware {
  constructor(private readonly clinicsDbConnector: ClinicsDbConnectorService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {
      const hostName = req.header('host');
      const clinicId = await this.clinicsDbConnector.getClinicIdByHostName({
        hostName,
      });

      if (clinicId) {
        req.clinicId = clinicId;
      }

      next();
    };
  }
}
