import { Serialize } from '@decorators/serialize.decorator';
import { CreateUserDto } from '@dtos/users/create-user.dto';
import { UserDto } from '@dtos/users/user.dto';
import { GoogleAuthGuard } from '@guards/google-auth.guard';
import { AuthLogic } from '@logics/auth/auth.logic';
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

@Controller('/api/auth')
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

  @Get('/signin/google')
  @UseGuards(GoogleAuthGuard)
  async signinByGoogle() {
    return 'Sign in by Google';
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async redirectByGoogle() {
    return 'Google redirect';
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
