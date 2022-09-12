import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@models/user';
import { UsersService } from '@services/users/users.service';
import { Utils } from '@utils/utils';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class AuthLogic {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private utils: Utils,
  ) {}

  public async signup(email: string, password: string): Promise<User> {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const hashed = await this.utils.hashing(password);
    return this.authService.create(email, hashed);
  }

  public async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!(await this.utils.validatePassword(user, password))) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
