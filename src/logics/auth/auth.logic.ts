import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  public async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (this.utils.validatePassword(user, password)) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
