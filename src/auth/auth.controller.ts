import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupDto, SigninDto, RefreshDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MESSAGE } from './auth.constants';
import { SignupResponse, SigninResponse } from './auth.model';
import { JwtRefreshTokenGuard } from '../_guards/jwt-refresh.guard';
import { UserEmail } from '../_decorators/user-email.decorator';

@ApiTags('Auth-controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Created successfully',
    type: SignupResponse,
    links: {},
  })
  @UsePipes(new ValidationPipe())
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
  @UsePipes(new ValidationPipe())
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
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@UserEmail() email: string): Promise<SigninResponse> {
    return this.authService.refresh(email);
  }
}
