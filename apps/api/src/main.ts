import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { ClientAssetsResponderFilter } from './filters/client-assets-responder.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';
import { useContainer } from 'class-validator';

export const PATH_PREFIX = process.env.PATH_PREFIX || 'api/v1';

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

const SENTRY_KEY = process.env.SENTRY_KEY;

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

  // Needed for serving (reverse proxying) client React app assets (files)
  app.useGlobalFilters(new ClientAssetsResponderFilter());

  // If no key - then do not use Sentry (dev mode)
  if (SENTRY_KEY) {
    // Init Sentry SDK
    Sentry.init({ dsn: SENTRY_KEY });

    app.useGlobalInterceptors(
      new RavenInterceptor({
        filters: [
          // Filter exceptions of type HttpException, ignore those that have status code of less than 500
          {
            type: HttpException,
            filter: (exception: HttpException) =>
              exception.getStatus() >= HttpStatus.INTERNAL_SERVER_ERROR,
          },
        ],
      }),
    );
  }

  // Setup Swagger
  const options = new DocumentBuilder().setTitle('DNTSC API').build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${PATH_PREFIX}/api-docs`, app, document);

  const port = Number(process.env.PORT);

  await app.listen(port);
}

bootstrap();
