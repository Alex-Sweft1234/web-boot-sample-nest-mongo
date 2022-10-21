import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ConstantModel } from './constant.model';
import { ConstantService } from './constant.service';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('Constant-controller')
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
  // @UseGuards(JwtAuthGuard)
  @Get()
  async get() {
    return this.constantService.get();
  }
}
