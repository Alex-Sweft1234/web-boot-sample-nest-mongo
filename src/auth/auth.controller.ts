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
import { MESSAGE } from './auth.constants';
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
  @Post('signup')
  async register(@Body() dto: AuthDto): Promise<registerResponse> {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(MESSAGE.ALREADY_REGISTER_ERROR);
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
  @Post('signin')
  async login(@Body() { login, password }: AuthDto): Promise<loginResponse> {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
