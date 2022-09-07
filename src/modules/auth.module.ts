import { AuthController } from '@controllers/auth/auth.controller';
import { UserEntity } from '@entities/user.entity';
import { AuthLogic } from '@logics/auth/auth.logic';
import { UsersLogic } from '@logics/users/users.logic';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthLogic, UsersService, UsersLogic],
})
export class AuthModule {}
