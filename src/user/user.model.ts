import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @ApiProperty()
  @prop()
  first_name: string;

  @ApiProperty()
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  phone: string;
}

export class UserResponse {
  @ApiProperty({ type: UserModel })
  data: {
    _id: Types.ObjectId;
    first_name: string;
    email: string;
    phone: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
