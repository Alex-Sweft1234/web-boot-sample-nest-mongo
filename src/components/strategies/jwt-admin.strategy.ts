import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminModel } from '../../modules/admin/models';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('NEST_ACCESS_ADMIN_JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate({ login }: Pick<AdminModel, 'login'>) {
    return login;
  }
}
