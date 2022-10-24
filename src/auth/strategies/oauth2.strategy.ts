import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../user.model';

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: '1',
      tokenURL: 'http://localhost:8080/api/constant',
      authorizationURL: 'http://localhost:8080/api/signin',
      callbackURL: 'http://localhost:8080/api/refresh',
      passReqToCallback: true,
    });
  }

  async validate({ email }: Pick<UserModel, 'email'>) {
    return email;
  }
}
