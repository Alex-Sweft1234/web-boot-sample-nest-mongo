import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AdminModel } from '../models';

class LoginPrivateToken {
  @ApiProperty()
  token_type: string;

  @ApiProperty()
  access_token: string;
}

export class LoginResponse {
  @ApiProperty({ type: LoginPrivateToken })
  data: {
    token_type: string;
    access_token: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}

export class AdminResponse {
  @ApiProperty({ type: AdminModel })
  data: {
    _id: Types.ObjectId;
    login: string;
    role: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
