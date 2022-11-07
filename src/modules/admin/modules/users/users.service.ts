import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../../../user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, STATUS } from './users.constant';
import { UsersResponse } from './dto';
import { UpdateUserDto } from '../../../user/dto/user.dto';
import { UserResponse } from '../../../user/dto/user.response';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  responseSuccessful(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async getUsers(): Promise<UsersResponse> {
    const users = await this.userModel.find().select(['_id', 'first_name', 'email', 'phone']);

    return this.responseSuccessful(
      users,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_REQUEST_USERS],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserResponse> {
    const objectId = new Types.ObjectId(id);
    const user = await this.userModel
      .findByIdAndUpdate(objectId, updateData, { new: true })
      .select(['_id', 'first_name', 'email', 'phone']);

    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);

    return this.responseSuccessful(user, HttpStatus.OK, [MESSAGE.SUCCESS_UPDATE_USER], STATUS.SUCCESS_STATUS_REQUEST);
  }
}
