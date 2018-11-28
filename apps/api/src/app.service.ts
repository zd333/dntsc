import { ConfigService } from './config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  root(): string {
    return `API app listens port ${
      this.configService.envConfig.API_SERVING_PORT
    }`;
  }
}
