import { User } from '@models/user';
import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class Utils {
  public async hashing(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  public async validatePassword(user: User, password: string) {
    const [salt, storeHash] = user.userPassword.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return storeHash === hash.toString('hex');
  }
}
