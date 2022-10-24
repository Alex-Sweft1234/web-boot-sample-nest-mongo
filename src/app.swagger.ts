import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER } from './app.constants';

export const config = new DocumentBuilder()
  .setTitle(SWAGGER.TITLE)
  .setVersion(SWAGGER.VERSION)
  .setDescription(SWAGGER.DESCRIPTION)
  .addBearerAuth()
  // .addOAuth2({
  //   type: 'oauth2',
  //   flows: {
  //     clientCredentials: {
  //       tokenUrl: 'http://localhost:8080/api/signin',
  //       scopes: {
  //         read: 'Grant read-only access to all your data except for the account and user info',
  //         write: 'Grant write-only access to all your data except for the account and user info',
  //         profile: 'Grant read-only access to the account and user info only',
  //       },
  //     },
  //   },
  // })
  .build();

export const options = {
  customCss:
    'html { overflow-y: auto; }.swagger-ui { margin-bottom: 50px; } .swagger-ui section.models { display: none; }',
};
