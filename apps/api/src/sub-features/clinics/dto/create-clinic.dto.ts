import { Clinic } from '../models/clinic.model';

export class CreateClinicDto {
  readonly name: Clinic['name'];
  readonly tenant: Clinic['tenant'];
}
