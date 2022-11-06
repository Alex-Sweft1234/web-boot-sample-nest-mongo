import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTAdminConfig } from '../../_configs';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminModel } from './models';
import { JwtAdminStrategy } from '../../components';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtAdminStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-admin' }),
    TypegooseModule.forFeature([
      {
        typegooseClass: AdminModel,
        schemaOptions: {
          collection: 'Admins',
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTAdminConfig,
    }),
  ],
})
export class AdminModule {}
