import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConstantController } from './constant.controller';
import { ConstantService } from './constant.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ConstantController],
  providers: [ConstantService],
})
export class ConstantModule {}
