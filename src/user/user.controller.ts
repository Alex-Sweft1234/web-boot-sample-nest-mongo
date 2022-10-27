import { Controller, Get, Patch, HttpStatus, UseGuards, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../_guards';
import { UserService } from './user.service';
import { UserResponse } from './dto/user.response';
import { UserEmail } from '../_decorators';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('User-controller')
@ApiBearerAuth()
@Controller('private/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: UserResponse,
    links: {},
  })
  @UseGuards(JwtAuthGuard)
  @Get('get')
  async get(@UserEmail() email: string): Promise<UserResponse> {
    return this.userService.getUser(email);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update successfully',
    type: UserResponse,
    links: {},
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponse> {
    return this.userService.updateUser(id, dto);
  }
}
