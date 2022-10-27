import { ApiProperty } from '@nestjs/swagger';

export class InfoUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}

export class SignupResponse {
  @ApiProperty({ type: InfoUser })
  data: {
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

export class PrivateToken {
  @ApiProperty()
  token_type: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

export class SigninResponse {
  @ApiProperty({ type: PrivateToken })
  data: {
    token_type: string;
    access_token: string;
    refresh_token: string;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
