import { HttpStatus, Injectable } from '@nestjs/common';
import { UserModel, UserResponse } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from './user.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async get(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email }).exec();

    return {
      data: {
        _id: user._id,
        first_name: user.first_name,
        email: user.email,
        phone: user.phone,
      },
      statusCode: HttpStatus.OK,
      message: [MESSAGE.SUCCESS_REQUEST_USER],
      success: STATUS.SUCCESS_STATUS_REQUEST,
    };
  }
}
