import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AdminLogin, BasicGuard, JwtAdminGuard } from '../../components';
import { AdminService } from './services';
import { ApiBasicAuth, ApiExcludeController } from '@nestjs/swagger';
import { LoginResponse, LoginDto, AdminResponse } from './dto';

@ApiExcludeController()
@Controller('admin')
@ApiBasicAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicGuard)
  async login(@Body() { username, password }: LoginDto): Promise<LoginResponse> {
    const { login } = await this.adminService.validateAdmin(username, password);
    return this.adminService.login({ login });
  }

  @Get('get')
  @UseGuards(JwtAdminGuard)
  async get(@AdminLogin() login: string): Promise<AdminResponse> {
    return this.adminService.getAdmin(login);
  }
}
