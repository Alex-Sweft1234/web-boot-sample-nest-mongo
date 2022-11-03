import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { BasicGuard } from '../../components';
import { AdminService } from './services';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse, LoginDto } from './dto';

@ApiTags('Admin-controller')
@Controller('admin')
@ApiBasicAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: LoginResponse,
    links: {},
  })
  async login(@Body() { username, password }: LoginDto): Promise<LoginResponse> {
    const { login } = await this.adminService.validateAdmin(username, password);
    return this.adminService.login({ login });
  }
}
