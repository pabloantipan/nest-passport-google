/* eslint-disable @typescript-eslint/ban-types */
import { UserEntity } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '@services/users/users.service';

@Injectable()
export class GoogleSessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    // console.log('serializeUser', user);
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findOne(payload.userId);
    // console.log('deserializeUser', user, payload);
    return user ? done(null, user) : done(null, null);
  }
}
