import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CREATE_SWAGGER } from './constants/swagger.constant';

export class CreateSwaggerParam {
  description: string;
  title: string;
  version: string;
  module: any;
  param: string;
}

export function createSwagger(app: NestExpressApplication) {
  const promiseArr = [];
  CREATE_SWAGGER.forEach((value: CreateSwaggerParam) => {
    promiseArr.push(genSwagger(value, app));
  });

  Promise.all(promiseArr);
}

export function genSwagger(
  data: CreateSwaggerParam,
  app: NestExpressApplication,
) {
  const swagger = new DocumentBuilder()
    .setTitle(data.title)
    .setDescription(data.description)
    .setVersion(data.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger, {
    include: [data.module],
  });

  SwaggerModule.setup(data.param, app, document);
}
