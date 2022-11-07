import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from 'nestjs-typegoose';
import { AdminModel } from '../models';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from '../admin.constants';
import { compare } from 'bcryptjs';
import { AdminResponse, LoginResponse } from '../dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel) private readonly adminModel: ModelType<AdminModel>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async privateToken(payload: { login: string }) {
    const token_type = 'bearer';
    const access_token = await this.jwtService.signAsync(payload);

    return { token_type, access_token };
  }

  responseSuccessful(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async findUser(login: string) {
    return this.adminModel.findOne({ login }).exec();
  }

  async validateAdmin(login: string, password: string): Promise<Pick<AdminModel, 'login'>> {
    const user = await this.findUser(login);

    if (!user) throw new UnauthorizedException([MESSAGE.USER_NOT_FOUND]);

    const isCorrectPassword = await compare(password, user.password_hash);
    if (!isCorrectPassword) throw new UnauthorizedException([MESSAGE.WRONG_PASSWORD_FOUND]);

    return { login: user.login };
  }

  async login(payload: { login: string }): Promise<LoginResponse> {
    const privateToken = await this.privateToken(payload);

    return this.responseSuccessful(privateToken, HttpStatus.OK, [MESSAGE.SUCCESS_AUTH], STATUS.SUCCESS_STATUS_REQUEST);
  }

  async getAdmin(login: string): Promise<AdminResponse> {
    const admin = await this.adminModel.findOne({ login }).select(['_id', 'login', 'role']).exec();
    if (!admin) throw new UnauthorizedException([MESSAGE.USER_NOT_FOUND]);

    return this.responseSuccessful(
      admin,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_REQUEST_ADMIN],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}
