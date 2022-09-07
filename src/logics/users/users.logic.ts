import { User } from '@models/user';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@services/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersLogic {
  constructor(private usersService: UsersService) {}

  public async signup(email: string, password: string): Promise<User> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return this.usersService.create(email, result);
  }
}
