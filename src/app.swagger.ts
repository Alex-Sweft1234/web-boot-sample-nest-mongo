import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER } from './app.constants';

export const config = new DocumentBuilder()
  .setTitle(SWAGGER.TITLE)
  .setVersion(SWAGGER.VERSION)
  .setDescription(SWAGGER.DESCRIPTION)
  // .addBearerAuth(
  //   {
  //     type: 'http',
  //     description: SWAGGER.BEARER_DESCRIPTION,
  //   },
  //   'Authorization',
  // )
  .addBearerAuth()
  .build();

export const options = {
  customCss:
    'html { overflow-y: auto; }.swagger-ui { margin-bottom: 50px; } .swagger-ui section.models { display: none; }',
};
