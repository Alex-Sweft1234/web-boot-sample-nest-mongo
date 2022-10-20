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
  @prop()
  data: any;

  @ApiProperty()
  @prop()
  message: string;

  @ApiProperty()
  @prop()
  status: number;
}

export class loginResponse {
  @ApiProperty()
  access_token: string;
}
