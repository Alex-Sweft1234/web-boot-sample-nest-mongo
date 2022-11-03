import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from 'nestjs-typegoose';
import { SigninModel } from './models';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(SigninModel) private readonly signinModel: ModelType<SigninModel>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async privateToken(payload: { login: string }) {
    const token_type = 'bearer';
    const access_token = await this.jwtService.signAsync(payload);

    return { token_type, access_token };
  }
}
