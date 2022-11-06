import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AdminLogin, BasicGuard, JwtAdminGuard } from '../../components';
import { AdminService } from './services';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse, LoginDto, AdminResponse } from './dto';

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

  @Get('get')
  @UseGuards(JwtAdminGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: AdminResponse,
    links: {},
  })
  async getA(@AdminLogin() login: string): Promise<AdminResponse> {
    return this.adminService.getAdmin(login);
  }
}
