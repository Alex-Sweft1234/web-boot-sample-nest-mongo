import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../../_configs';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { SigninAdminModel } from './models';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypegooseModule.forFeature([
      {
        typegooseClass: SigninAdminModel,
        schemaOptions: {
          collection: 'Admins',
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class AdminModule {}
