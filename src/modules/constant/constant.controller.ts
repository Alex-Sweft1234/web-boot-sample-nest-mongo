import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { BasicGuard } from 'src/components/guards';
import { ConstantModel } from './constant.model';
import { ConstantService } from './constant.service';

@ApiTags('Constant-controller')
@ApiBasicAuth()
@Controller('constant')
export class ConstantController {
  constructor(private readonly constantService: ConstantService) {}

  @Get()
  @UseGuards(BasicGuard)
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
