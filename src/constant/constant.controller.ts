import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConstantModel } from './constant.model';
import { ConstantService } from './constant.service';
import { Oauth2Guard } from '../auth/guards/oauth2.guard';

@ApiTags('Constant-controller')
@ApiBearerAuth()
@Controller('constant')
export class ConstantController {
  constructor(private readonly constantService: ConstantService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: ConstantModel,
    links: {},
  })
  // Пример приватного роута
  @UseGuards(Oauth2Guard)
  @Get()
  async get() {
    return this.constantService.get();
  }
}
