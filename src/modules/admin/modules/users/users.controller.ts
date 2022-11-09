import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUsersDto, queryPaginationDto, UsersResponse, UsersListResponse } from './dto';
import { JwtAdminGuard } from '../../../../components';

@ApiExcludeController()
@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('chart/get')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAdminGuard)
  async getChart(@Body() dto: { month?: number }) {
    return this.usersService.getChart(dto?.month);
  }

  @Get('get')
  @UseGuards(JwtAdminGuard)
  async getUsers(@Query() pagination: queryPaginationDto): Promise<UsersListResponse> {
    return this.usersService.getUsers(pagination);
  }

  @Patch('update/:id')
  @UseGuards(JwtAdminGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateUsersDto): Promise<UsersResponse> {
    return this.usersService.updateUser(id, dto);
  }
}
