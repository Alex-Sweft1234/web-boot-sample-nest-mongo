import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { UserModel } from '../user/user.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class SignupModel extends UserModel {
  @ApiProperty()
  @prop()
  password_hash: string;
}

export interface SigninModel extends Base {}

export class SigninModel extends TimeStamps {
  @ApiProperty()
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  password_hash: string;
}
