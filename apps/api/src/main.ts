import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // TODO: take from config
  await app.listen(4000);
}
bootstrap();
