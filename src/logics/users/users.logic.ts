import { Injectable } from '@nestjs/common';
import { UsersService } from '@services/users/users.service';

@Injectable()
export class UsersLogic {
  constructor(private usersService: UsersService) {}
  // for remove
}
