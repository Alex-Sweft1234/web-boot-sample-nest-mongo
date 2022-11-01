import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SignupModel } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../_configs';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JwtRefreshStrategy, BasicStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BasicStrategy, JwtStrategy, JwtRefreshStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypegooseModule.forFeature([
      {
        typegooseClass: SignupModel,
        schemaOptions: {
          collection: 'User',
          timestamps: {
            createdAt: 'created_date',
            updatedAt: 'updated_date',
          },
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
export class AuthModule {}
