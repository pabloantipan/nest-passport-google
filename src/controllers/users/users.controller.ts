import { CurrentUser } from '@decorators/current-user.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { UserDto } from '@dtos/users/user.dto';
import { AuthGuard } from '@guards/auth.guard';
import { User } from '@models/user';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';

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

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('status')
  @UseGuards(AuthGuard)
  async user(@CurrentUser() user: User) {
    if (user) {
      return { msg: 'Authenticated', user: user };
    } else {
      return { msg: 'Not Authenticated', user: user };
    }
  }
}
