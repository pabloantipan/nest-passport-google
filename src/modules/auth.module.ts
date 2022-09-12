import { AuthController } from '@controllers/auth/auth.controller';
import { UserEntity } from '@entities/user.entity';
import { CurrentUserInterceptor } from '@interceptors/current-user.interceptor';
import { AuthLogic } from '@logics/auth/auth.logic';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users/users.service';
import { Utils } from '@utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthLogic,
    AuthService,
    UsersService,
    Utils,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class AuthModule {}
