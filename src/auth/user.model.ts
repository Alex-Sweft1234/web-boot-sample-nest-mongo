import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @ApiProperty()
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  passwordHash: string;
}

export class registerResponse {
  @ApiProperty()
  data: any;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  success: string;
}

export class PrivateToken {
  @ApiProperty()
  access_token: string;
}

export class loginResponse {
  @ApiProperty({ type: PrivateToken })
  data: {
    access_token: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  success: string;
}
