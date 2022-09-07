import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('/')
  async default() {
    return 'hey there!';
  }
}
