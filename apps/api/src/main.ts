import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

// TODO: add Swagger

export const PATH_PREFIX = process.env.PATH_PREFIX || '/api/v1';

const API_MAX_RATE_LIMIT_WINDOW = isNaN(
  Number(process.env.API_MAX_RATE_LIMIT_WINDOW),
)
  ? 60000
  : Number(process.env.API_MAX_RATE_LIMIT_WINDOW);
const API_MAX_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW = isNaN(
  Number(process.env.API_MAX_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW),
)
  ? 1000
  : Number(process.env.API_MAX_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Helmet adds some good for security headers
  app.use(helmet());
  app.use(
    new rateLimit({
      windowMs: API_MAX_RATE_LIMIT_WINDOW,
      max: API_MAX_RATE_LIMIT_MAX_REQUESTS_PER_WINDOW,
    }),
  );

  app.setGlobalPrefix(PATH_PREFIX);

  // This is needed for DI in custom validators (constraints)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    // Needed for class-validator which processes in-dto
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: { target: false, value: false },
    }),
  );

  const port = Number(process.env.PORT);

  await app.listen(port);
}

bootstrap();
