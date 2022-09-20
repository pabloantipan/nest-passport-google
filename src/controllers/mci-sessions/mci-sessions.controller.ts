import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { ValidateMciSessionDto } from '@dtos/mci-sessions/validate-mci-session.dto';
import { MciSessionsLogic } from '@logics/mci-sessions/mci-sessions.logic';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('mci-sessions')
export class MciSessionsController {
  constructor(private mciSessionLogic: MciSessionsLogic) {}

  @Post('/up')
  async sessionUp(@Body() body: CreateMciSessionDto) {
    return this.mciSessionLogic.sessionUp(body.userId);
  }

  @Post('/validate')
  async validate(@Body() body: ValidateMciSessionDto) {
    return this.mciSessionLogic.validate(body.token);
  }

  @Post('/down')
  async sessionDown(@Body() body: ValidateMciSessionDto) {
    return this.mciSessionLogic.sessionDown(body.token);
  }
}
