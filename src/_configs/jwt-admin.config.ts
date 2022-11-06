import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTAdminConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('NEST_ACCESS_ADMIN_JWT_SECRET'),
    signOptions: {
      subject: 'access',
    },
  };
};
