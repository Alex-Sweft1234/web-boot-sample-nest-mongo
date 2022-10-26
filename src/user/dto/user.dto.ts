import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, ValidationArguments } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @Exclude()
  _id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail(
    {},
    { message: (validationArguments: ValidationArguments) => `Некорректный e-mail ${validationArguments.value}` },
  )
  @IsNotEmpty({ message: () => 'E-mail не должен быть пустым' })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @Length(10, 10, { message: () => 'Номер телефона должен иметь 11 цифр' })
  phone?: string;
}
