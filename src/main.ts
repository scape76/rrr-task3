import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.listen(configService.get("PORT") || 3000);
}

bootstrap();
