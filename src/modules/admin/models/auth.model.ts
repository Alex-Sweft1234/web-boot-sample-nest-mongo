import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface SigninModel extends Base {}

export class SigninModel {
  @ApiProperty()
  @prop({ unique: true })
  login: string;

  @ApiProperty()
  @prop()
  password_hash: string;
}
