import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, ValidationArguments } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateUsersDto {
  @IsOptional()
  @Exclude()
  _id?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsEmail(
    {},
    { message: (validationArguments: ValidationArguments) => `Некорректный e-mail ${validationArguments.value}` },
  )
  @IsNotEmpty({ message: () => 'E-mail не должен быть пустым' })
  email?: string;

  @IsOptional()
  @Length(10, 10, { message: () => 'Номер телефона должен иметь 11 цифр' })
  phone?: string;
}
