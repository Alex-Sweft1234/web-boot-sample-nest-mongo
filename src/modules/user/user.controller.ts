import { Controller, Get, Patch, HttpStatus, UseGuards, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserEmail } from '../../components';
import { UserService } from './user.service';
import { UserResponse } from './dto/user.response';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('User-controller')
@ApiBearerAuth()
@Controller('private/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: UserResponse,
    links: {},
  })
  async get(@UserEmail() email: string): Promise<UserResponse> {
    return this.userService.getUser(email);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update successfully',
    type: UserResponse,
    links: {},
  })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponse> {
    return this.userService.updateUser(id, dto);
  }
}
