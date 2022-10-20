import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Nestjs API')
    .setDescription('Template project Nestjs API.')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
