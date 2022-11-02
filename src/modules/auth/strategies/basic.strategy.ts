import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({ passReqToCallback: true });
  }

  async validate(req, username, password): Promise<boolean> {
    const userHttp = this.configService.get<string>('NEST_HTTP_BASIC_USER');
    const passwordHttp = this.configService.get<string>('NEST_HTTP_BASIC_PASS');

    if (userHttp !== username && passwordHttp !== password) throw new UnauthorizedException();

    return true;
  }
}
