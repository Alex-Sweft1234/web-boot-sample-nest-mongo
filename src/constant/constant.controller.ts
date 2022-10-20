import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ConstantModel } from './constant.model';
import { ConstantService } from './constant.service';

@ApiTags('Constant-controller')
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Get successfully',
  type: ConstantModel,
  links: {},
})
@Controller('constant')
export class ConstantController {
  constructor(private readonly constantService: ConstantService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get successfully',
    type: ConstantModel,
    links: {},
  })
  async get() {
    return this.constantService.get();
  }
}
