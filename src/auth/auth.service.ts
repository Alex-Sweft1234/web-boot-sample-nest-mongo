import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupModel, SigninModel } from './auth.model';
import { SignupResponse, SigninResponse } from './dto/auth.response';
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

  async privateToken(payload: { email: string }) {
    const token_type = 'bearer';
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('NEST_REFRESH_JWT_SECRET'),
      expiresIn: this.configService.get<string>('NEST_REFRESH_JWT_TIME'),
      subject: 'refresh',
    });

    return { token_type, access_token, refresh_token };
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

  responseSuccessful(data: any, statusCode: HttpStatus.CREATED | HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async createUser({ first_name, email, phone, password }: SignupDto): Promise<SignupResponse> {
    const salt = await genSalt(10);
    const newUser = new this.signupModel({
      first_name: first_name,
      email: email,
      phone: phone,
      password_hash: await hash(password, salt),
    });

    await newUser.save();

    return this.responseSuccessful(
      { email, phone },
      HttpStatus.CREATED,
      [MESSAGE.SUCCESS_REGISTRATION],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async login(payload: { email: string }): Promise<SigninResponse> {
    const privateToken = await this.privateToken(payload);

    return this.responseSuccessful(privateToken, HttpStatus.OK, [MESSAGE.SUCCESS_AUTH], STATUS.SUCCESS_STATUS_REQUEST);
  }

  async refresh(email: string): Promise<SigninResponse> {
    const payload = { email };
    const privateToken = await this.privateToken(payload);

    return this.responseSuccessful(
      privateToken,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPDATE_ACCESS_TOKEN],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}
