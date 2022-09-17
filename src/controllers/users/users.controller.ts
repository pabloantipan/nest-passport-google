import { CurrentUser } from '@decorators/current-user.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { UserDto } from '@dtos/users/user.dto';
import { AuthGuard } from '@guards/auth.guard';
import { GoogleAuthGuard } from '@guards/google-auth.guard';
import { User } from '@models/user';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';
import { Request } from 'express';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async default() {
    return 'hey there!';
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
