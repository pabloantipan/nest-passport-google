import { UsersController } from '@controllers/users/users.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
