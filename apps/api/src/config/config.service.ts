import { Injectable } from '@nestjs/common';

/**
 * Exposes various app config values.
 */
@Injectable()
export class ConfigService {
  public readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = this.getConfigFromEnvVars();
  }

  /**
   * Reads and returns config values from env vars.
   * Also validates values and throws error in case of a value is missing or invalid.
   */
  private getConfigFromEnvVars(): EnvConfig {
    if (!process.env.API_SERVING_PORT) {
      throw new Error('API_SERVING_PORT env var is not defined');
    }
    const API_SERVING_PORT = Number(process.env.API_SERVING_PORT);
    if (isNaN(API_SERVING_PORT)) {
      throw new Error('API_SERVING_PORT env var has invalid value');
    }

    return { API_SERVING_PORT };
  }
}

export interface EnvConfig {
  /**
   * App will listen this port (external API requests come to this port).
   */
  API_SERVING_PORT: number;
}
