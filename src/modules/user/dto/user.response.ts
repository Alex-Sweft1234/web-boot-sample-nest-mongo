import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserModel } from '../user.model';

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
