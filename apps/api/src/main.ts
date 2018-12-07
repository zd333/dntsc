import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // This is needed for DI in custom validators (constraints)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: { target: false, value: false },
    }),
  );

  await app.listen(process.env.API_SERVING_PORT);
}

bootstrap();
