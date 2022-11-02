import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConstantModel } from './constant.model';

@Injectable()
export class ConstantService {
  constructor(private readonly configService: ConfigService) {}

  async get(): Promise<ConstantModel> {
    return {
      PROFILE: this.configService.get('NEST_PROFILE'),
      NOW: new Date(),
    };
  }
}
