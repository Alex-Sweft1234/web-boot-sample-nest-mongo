import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupModel, SigninModel, SignupResponse, SigninResponse } from './auth.model';
import { SignupDto } from './dto/auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SignupModel) private readonly signupModel: ModelType<SignupModel>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({ first_name, email, phone, password }: SignupDto): Promise<SignupResponse> {
    const salt = await genSalt(10);
    const newUser = new this.signupModel({
      first_name: first_name,
      email: email,
      phone: phone,
      password_hash: await hash(password, salt),
    });

    await newUser.save();

    return {
      data: {},
      statusCode: HttpStatus.CREATED,
      message: [MESSAGE.SUCCESS_REGISTRATION],
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }

  async findUser(email: string) {
    return this.signupModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<SigninModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException([MESSAGE.USER_NOT_FOUND]);

    const isCorrectPassword = await compare(password, user.password_hash);
    if (!isCorrectPassword) throw new UnauthorizedException([MESSAGE.WRONG_PASSWORD_FOUND]);

    return { email: user.email };
  }

  async login(payload: { email: string }): Promise<SigninResponse> {
    const type = 'bearer';
    const access = await this.jwtService.signAsync(payload);
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get('NEST_REFRESH_JWT_TIME'),
    });

    return {
      data: { token_type: type, access_token: access, refresh_token: refresh },
      statusCode: HttpStatus.OK,
      message: [MESSAGE.SUCCESS_AUTH],
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }

  async refresh(email: string): Promise<SigninResponse> {
    const payload = { email };

    const type = 'bearer';
    const access = await this.jwtService.signAsync(payload);
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get('NEST_REFRESH_JWT_TIME'),
    });

    return {
      data: { token_type: type, access_token: access, refresh_token: refresh },
      statusCode: HttpStatus.OK,
      message: [MESSAGE.SUCCESS_UPDATE_ACCESS_TOKEN],
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }
}
