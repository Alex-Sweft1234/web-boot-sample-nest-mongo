import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { ApiBasicAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MESSAGE } from './auth.constants';
import { SignupResponse, SigninResponse } from './dto/auth.response';
import { BasicGuard, JwtRefreshTokenGuard } from '../_guards';
import { UserEmail } from '../_decorators';

@ApiTags('Auth-controller')
@ApiBasicAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Created successfully',
    type: SignupResponse,
    links: {},
  })
  @UseGuards(BasicGuard)
  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<SignupResponse> {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(MESSAGE.ALREADY_REGISTER_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: SigninResponse,
    links: {},
  })
  @UseGuards(BasicGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() { login, password }: SigninDto): Promise<SigninResponse> {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login({ email });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: SigninResponse,
    links: {},
  })
  @UseGuards(JwtRefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@UserEmail() email: string): Promise<SigninResponse> {
    return this.authService.refresh(email);
  }
}
