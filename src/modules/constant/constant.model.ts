import { ApiProperty } from '@nestjs/swagger';

export class ConstantModel {
  @ApiProperty()
  PROFILE: string;

  @ApiProperty()
  NOW: Date;
}
