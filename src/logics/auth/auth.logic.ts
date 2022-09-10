import { Injectable } from '@nestjs/common';
import { User } from '@models/user';
import { UsersService } from '@services/users/users.service';
import { Utils } from '@utils/utils';

@Injectable()
export class AuthLogic {
  constructor(private usersService: UsersService, private utils: Utils) {}

  public async signup(email: string, password: string): Promise<User> {
    const hashed = await this.utils.hashing(password);
    return this.usersService.create(email, hashed);
  }
}
