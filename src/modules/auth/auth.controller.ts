import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { ApiBasicAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MESSAGE } from './auth.constants';
import { SignupResponse, SigninResponse } from './dto/auth.response';
import { BasicGuard, JwtRefreshTokenGuard, UserEmail, UnauthorizedExceptionFilter } from '../../components';

@ApiTags('Auth-controller')
@ApiBasicAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseGuards(BasicGuard)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Created successfully',
    type: SignupResponse,
    links: {},
  })
  async signup(@Body() dto: SignupDto): Promise<SignupResponse> {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(MESSAGE.ALREADY_REGISTER_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: SigninResponse,
    links: {},
  })
  async signin(@Body() { login, password }: SigninDto): Promise<SigninResponse> {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login({ email });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshTokenGuard)
  @UseFilters(new UnauthorizedExceptionFilter())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: SigninResponse,
    links: {},
  })
  async refresh(@UserEmail() email: string): Promise<SigninResponse> {
    return this.authService.refresh(email);
  }
}
