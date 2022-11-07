import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../../../user/user.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Users',
        },
      },
    ]),
  ],
})
export class UsersModule {}
