import { UsersController } from '@controllers/users/users.controller';
import { UserEntity } from '@entities/user.entity';
import { CurrentUserInterceptor } from '@interceptors/current-user.interceptor';
import { UsersLogic } from '@logics/users/users.logic';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@services/users/users.service';
import { Utils } from '@utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersLogic,
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
