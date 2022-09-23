import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { MciSession } from '@schemas/mci-session.schema';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.services';

const MCI_SESSION_DURATION_SEC = 30;

@Injectable()
export class MciSessionsLogic {
  constructor(private mciSessionsService: MciSessionsService) {}

  public async sessionUp(userId: string): Promise<MciSession> {
    const newSession = {
      userId: userId,
      duration: '1',
    } as CreateMciSessionDto;
    return this.mciSessionsService.create(newSession);
  }

  public async validate(token: string): Promise<MciSession[]> {
    return this.mciSessionsService.findAll();
  }

  public async sessionDown(token: string): Promise<boolean> {
    return true;
  }
}
