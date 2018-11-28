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
    return {
      API_SERVING_PORT: this.getAndValidateNumericEnvParam('API_SERVING_PORT'),
      MONGO_HOST: this.getAndValidateStringEnvParam('MONGO_HOST'),
      MONGO_PORT: this.getAndValidateNumericEnvParam('MONGO_PORT'),
      MONGO_USER: this.getAndValidateStringEnvParam('MONGO_USER'),
      MONGO_PASSWORD: this.getAndValidateStringEnvParam('MONGO_PASSWORD'),
      MONGO_DB_NAME: this.getAndValidateStringEnvParam('MONGO_DB_NAME'),
    };
  }

  private getAndValidateNumericEnvParam(envConfigKey: keyof EnvConfig): number {
    const numericValue = Number(
      this.getAndValidateStringEnvParam(envConfigKey),
    );

    if (isNaN(numericValue)) {
      throw new Error(
        `${envConfigKey} environment configuration variable is has invalid value ${numericValue}`,
      );
    }

    return numericValue;
  }

  private getAndValidateStringEnvParam(envConfigKey: keyof EnvConfig): string {
    if (!process.env[envConfigKey]) {
      throw new Error(
        `${envConfigKey} environment configuration variable is not defined`,
      );
    }

    return process.env[envConfigKey];
  }
}

export interface EnvConfig {
  /**
   * App will listen this port (external API requests come to this port).
   */
  readonly API_SERVING_PORT: number;
  readonly MONGO_HOST: string;
  readonly MONGO_PORT: number;
  readonly MONGO_USER: string;
  readonly MONGO_PASSWORD: string;
  readonly MONGO_DB_NAME: string;
}
