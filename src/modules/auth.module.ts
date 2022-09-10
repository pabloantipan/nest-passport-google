import { AuthController } from '@controllers/auth/auth.controller';
import { UserEntity } from '@entities/user.entity';
import { AuthLogic } from '@logics/auth/auth.logic';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@services/users/users.service';
import { Utils } from '@utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthLogic, UsersService, Utils],
})
export class AuthModule {}
