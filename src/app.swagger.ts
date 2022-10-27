import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER = {
  TITLE: 'Nestjs API',
  VERSION: '1.0.0',
  DESCRIPTION: 'Template project Nestjs API.',
  BEARER_DESCRIPTION: 'JWT Authorization header using the Bearer scheme.<br />Your token in the text input below.',
};

export const config = new DocumentBuilder()
  .setTitle(SWAGGER.TITLE)
  .setVersion(SWAGGER.VERSION)
  .setDescription(SWAGGER.DESCRIPTION)
  .addBasicAuth()
  .addBearerAuth()
  .build();

export const options = {
  customCss:
    'html { overflow-y: auto; }.swagger-ui { margin-bottom: 50px; } .swagger-ui section.models { display: none; }',
};
