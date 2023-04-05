import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Source } from './database/database.config';
import { ENV_CONFIG } from './shared/constants/env.constant';
import { createSwagger } from './swaggers/create.swagger';

async function bootstrap() {
  const { port, apiVersion } = ENV_CONFIG.system;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [apiVersion],
  });

  //Setup Swagger
  createSwagger(app);
  // Setup auto-validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await Source.setConnect();
  await app.listen(process.env.PORT || port);
  Logger.log(`Server listening on http://localhost:${port}/`);
}
bootstrap();
