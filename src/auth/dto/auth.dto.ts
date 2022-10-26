import { IsEmail, IsNotEmpty, IsString, Length, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsEmail(
    {},
    { message: (validationArguments: ValidationArguments) => `Некорректный e-mail ${validationArguments.value}` },
  )
  @IsNotEmpty({ message: () => 'E-mail не должен быть пустым' })
  email: string;

  @ApiProperty()
  @Length(10, 10, { message: () => 'Номер телефона должен иметь 11 цифр' })
  phone: string;

  @ApiProperty()
  @Length(6, 6, { message: () => 'Длина пароля должна быть равна 6 символам' })
  @IsNotEmpty({ message: () => 'Пароль не должен быть пустым' })
  password: string;
}

export class SigninDto {
  @ApiProperty({ default: 'babaev@atoms.ru' })
  @IsEmail(
    {},
    { message: (validationArguments: ValidationArguments) => `Некорректный e-mail ${validationArguments.value}` },
  )
  @IsNotEmpty({ message: () => 'E-mail не должен быть пустым' })
  login: string;

  @ApiProperty({ default: '123456' })
  @Length(6, 6, { message: () => 'Длина пароля должна быть равна 6 символам' })
  @IsNotEmpty({ message: () => 'Пароль должен быть пустым' })
  password: string;
}
