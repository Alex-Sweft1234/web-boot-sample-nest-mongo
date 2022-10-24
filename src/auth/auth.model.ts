import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface SignupModel extends Base {}

export class SignupModel extends TimeStamps {
  @ApiProperty()
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  passwordHash: string;
}

export interface SigninModel extends Base {}

export class SigninModel extends TimeStamps {
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
  token_type: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

export class loginResponse {
  @ApiProperty({ type: PrivateToken })
  data: {
    token_type: string;
    access_token: string;
    refresh_token: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  success: string;
}
