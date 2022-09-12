import { Serialize } from '@decorators/serialize.decorator';
import { CreateUserDto } from '@dtos/users/create-user.dto';
import { UserDto } from '@dtos/users/user.dto';
import { AuthLogic } from '@logics/auth/auth.logic';
import { Body, Controller, Post, Session } from '@nestjs/common';

@Controller('/auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authLogic: AuthLogic) {}

  @Post('/signup')
  public async createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authLogic.signup(body.userEmail, body.userPassword);
    session.userId = user.userId;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authLogic.signin(body.userEmail, body.userPassword);
    session.userId = user.userId;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
