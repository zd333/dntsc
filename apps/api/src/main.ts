import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

// Hard-code rate limit values (no need to have them flexible and pass via env variables)
// 15 minutes
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
// Limit each IP to 100 requests per windowMs
const RATE_LIMIT_MAX_REQUESTS = 100;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Helmet adds some good for security headers
  app.use(helmet());
  app.use(
    new rateLimit({
      windowMs: RATE_LIMIT_WINDOW,
      max: RATE_LIMIT_MAX_REQUESTS,
    }),
  );

  app.setGlobalPrefix('api/v1');

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

  const port = Number(process.env.API_SERVING_PORT);

  await app.listen(port);
}

bootstrap();
