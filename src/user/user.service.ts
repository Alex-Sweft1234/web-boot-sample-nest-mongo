import { HttpStatus, Injectable } from '@nestjs/common';
import { UserModel, UserResponse } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from './user.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  response(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async get(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email }).exec();

    const data = {
      _id: user._id,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
    };

    return this.response(data, HttpStatus.OK, [MESSAGE.SUCCESS_REQUEST_USER], STATUS.SUCCESS_STATUS_REQUEST);
  }
}
