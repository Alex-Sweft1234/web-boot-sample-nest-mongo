import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserModel, UserResponse } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from './user.constants';
import { UpdateUserDto } from './dto/user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  responseSuccess(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async getUser(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email }).exec();

    return this.responseSuccess(
      {
        ...user,
        password_hash: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_REQUEST_USER],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponse> {
    const objectId = new Types.ObjectId(id);
    const newDataUser = await this.userModel.findByIdAndUpdate(objectId, updateData, { new: true });

    if (!newDataUser) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);

    return this.responseSuccess(
      {
        _id: newDataUser._id,
        first_name: newDataUser.first_name,
        email: newDataUser.email,
        phone: newDataUser.phone,
      },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPDATE_USER],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}
