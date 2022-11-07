import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AdminModel extends Base {}

export class AdminModel extends TimeStamps {
  @ApiProperty()
  @prop({ unique: true })
  login: string;

  @ApiProperty()
  @prop()
  role: string;

  @ApiProperty()
  @prop()
  password_hash: string;
}
