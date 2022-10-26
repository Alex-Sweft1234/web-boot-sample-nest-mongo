import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('NEST_ACCESS_JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('NEST_ACCESS_JWT_TIME'),
      subject: 'access',
    },
  };
};
