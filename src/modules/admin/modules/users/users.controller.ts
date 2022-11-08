import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUsersDto, queryPaginationDto, UsersResponse } from './dto';
import { JwtAdminGuard } from '../../../../components';

@ApiExcludeController()
@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get')
  @UseGuards(JwtAdminGuard)
  async get(@Query() pagination: queryPaginationDto) {
    return this.usersService.getUsers(pagination);
  }

  @Patch('update/:id')
  @UseGuards(JwtAdminGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateUsersDto): Promise<UsersResponse> {
    return this.usersService.updateUser(id, dto);
  }
}
