import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ALREADY_REGISTER_ERROR } from './auth.constants';
import { loginResponse, registerResponse } from './user.model';

@ApiTags('User-controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Created successfully',
    type: registerResponse,
    links: {},
  })
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTER_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: loginResponse,
    links: {},
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
