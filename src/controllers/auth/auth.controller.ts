import { CreateUserDto } from '@dtos/users/create-user.dto';
import { AuthLogic } from '@logics/auth/auth.logic';
import { Body, Controller, Post, Session } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private authLogic: AuthLogic) {}

  @Post('/signup')
  public async createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authLogic.signup(body.userEmail, body.userPassword);
    console.log(user, session);
    session.userId = user.userId;
    return user;
  }
}
