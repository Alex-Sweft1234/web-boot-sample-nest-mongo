import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginResponse, registerResponse, UserModel } from './user.model';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { STATUS, MESSAGE } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto): Promise<registerResponse> {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
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
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(MESSAGE.USER_NOT_FOUND);

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) throw new UnauthorizedException(MESSAGE.WRONG_PASSWORD_FOUND);

    return { email: user.email };
  }

  async login(email: string): Promise<loginResponse> {
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);

    return {
      data: { access_token: token },
      statusCode: HttpStatus.CREATED,
      message: MESSAGE.SUCCESS_AUTH,
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }
}
