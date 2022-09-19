import { Injectable } from '@nestjs/common';
import { MciSession } from '@schemas/mci-session.schema';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.services';

@Injectable()
export class MciSessionsLogic {
  constructor(private mciSessionsService: MciSessionsService) {}

  public async sessionUp(userId: string): Promise<MciSession> {
    return Promise.resolve({} as MciSession);
  }

  public async validate(token: string): Promise<boolean> {
    return true;
  }

  public async sessionDown(token: string): Promise<boolean> {
    return true;
  }
}
