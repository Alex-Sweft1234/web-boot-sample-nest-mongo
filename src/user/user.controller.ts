import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../_guards';
import { UserService } from './user.service';
import { UserResponse } from './user.model';
import { UserEmail } from '../_decorators';

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
  async get(@UserEmail() email: string) {
    return this.userService.get(email);
  }
}
