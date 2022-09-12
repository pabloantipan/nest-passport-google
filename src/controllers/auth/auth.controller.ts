import { CurrentUser } from '@decorators/current-user.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { CreateUserDto } from '@dtos/users/create-user.dto';
import { UserDto } from '@dtos/users/user.dto';
import { AuthGuard } from '@guards/auth.guard';
import { AuthLogic } from '@logics/auth/auth.logic';
import { User } from '@models/user';
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

@Controller('/auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authLogic: AuthLogic) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

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
}
