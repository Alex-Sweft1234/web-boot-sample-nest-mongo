import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ConstantModel } from './constant.model';
import { ConstantService } from './constant.service';

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
  @Get()
  async get() {
    return this.constantService.get();
  }
}
