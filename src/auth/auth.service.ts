import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupModel, SigninModel, loginResponse, registerResponse } from './auth.model';
import { AuthDto } from './dto/auth.dto';
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

  async createUser(dto: AuthDto): Promise<registerResponse> {
    const salt = await genSalt(10);
    const newUser = new this.signupModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    await newUser.save();

    return {
      data: {},
      statusCode: HttpStatus.CREATED,
      message: MESSAGE.SUCCESS_REGISTRATION,
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }

  async findUser(email: string) {
    return this.signupModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<SigninModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(MESSAGE.USER_NOT_FOUND);

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) throw new UnauthorizedException(MESSAGE.WRONG_PASSWORD_FOUND);

    return { email: user.email };
  }

  async login(payload: { email: string }): Promise<loginResponse> {
    const type = 'bearer';
    const access = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_ACCESS_JWT_SECRET'),
      expiresIn: this.configService.get('NEST_ACCESS_JWT_TIME'),
    });
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_REFRESH_JWT_SECRET'),
    });

    return {
      data: { token_type: type, access_token: access, refresh_token: refresh },
      statusCode: HttpStatus.CREATED,
      message: MESSAGE.SUCCESS_AUTH,
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }

  async refresh(email: string, token: string): Promise<loginResponse> {
    const type = 'bearer';
    const payload = { email };
    const access = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_ACCESS_JWT_SECRET'),
      expiresIn: this.configService.get('NEST_ACCESS_JWT_TIME'),
    });
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('NEST_REFRESH_JWT_SECRET'),
    });
    // const isVerify = await this.jwtService.verifyAsync(token);
    //
    // if (!isVerify) throw new UnauthorizedException(MESSAGE.INVALID_UPDATE_ACCESS_TOKEN);

    return {
      data: { token_type: type, access_token: access, refresh_token: refresh },
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS_UPDATE_ACCESS_TOKEN,
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }
}
