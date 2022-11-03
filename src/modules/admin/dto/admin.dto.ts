import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'admin' })
  @IsString()
  @IsNotEmpty({ message: () => 'Логин не должен быть пустым' })
  username: string;

  @ApiProperty({ default: '123456' })
  @Length(6, 6, { message: () => 'Длина пароля должна быть равна 6 символам' })
  @IsNotEmpty({ message: () => 'Пароль должен быть пустым' })
  password: string;
}
