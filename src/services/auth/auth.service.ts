import { AuthLogic } from '@logics/auth/auth.logic';
import { User } from '@models/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private authLogic: AuthLogic) {}

  public async signup(email: string, password: string): Promise<User> {
    return this.authLogic.signup(email, password);
  }
}
