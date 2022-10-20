import { ApiProperty } from '@nestjs/swagger';

export class ConstantModel {
  @ApiProperty()
  NOW: Date;

  @ApiProperty()
  PROFILE: string;
}
