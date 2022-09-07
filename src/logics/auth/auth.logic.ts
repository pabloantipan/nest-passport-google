import { Injectable } from '@nestjs/common';
import { User } from '@models/user';
import { UsersLogic } from '@logics/users/users.logic';

@Injectable()
export class AuthLogic {
  constructor(private usersLogic: UsersLogic) {}

  public async signup(email: string, password: string): Promise<User> {
    return this.usersLogic.signup(email, password);
  }
}
