import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { SessionIdInterface } from '@interfaces/mci-sessions/session-id.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MciSession } from '@schemas/mci-session.schema';
import { EncryptionService } from '@services/encryption/encryption.service';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.services';
import { Utils } from '@utils/utils';

const MCI_SESSION_DURATION_SEC = 30;

@Injectable()
export class MciSessionsLogic {
  constructor(
    private mciSessionsService: MciSessionsService,
    private encryptionService: EncryptionService,
    private configService: ConfigService,
    private utils: Utils,
  ) {
    this.encryptionService.setKey();
  }

  public async sessionUp(userId: string): Promise<MciSession> {
    const currentDate = new Date();
    const setSessionAlive = true;
    const setSessionTerminatedOn = this.utils.addLapseTimeToDate(
      currentDate,
      MCI_SESSION_DURATION_SEC,
    );
    const newMciSession = {
      sessionId: await this.generateSessionId(userId, currentDate),
      userId,
      createdOn: currentDate,
      duration: MCI_SESSION_DURATION_SEC,
      alive: setSessionAlive,
      terminateOn: setSessionTerminatedOn,
    } as MciSessionInterface;

    return this.mciSessionsService.create(newMciSession);
  }

  public async validate(sessionId: string): Promise<MciSession[]> {
    return this.mciSessionsService.findAll();
  }

  public async sessionDown(sessionId: string): Promise<boolean> {
    return true;
  }

  private async generateSessionId(userId: string, currentDate: Date) {
    const sessionId = {
      userId,
      serverValidator: this.configService.get('SERVICE_IDENTITY'),
      createdOn: currentDate,
      randomKey: Math.floor(Math.random() * 10000),
    } as SessionIdInterface;

    return await this.encryptionService.encryptToLegibleString(
      JSON.stringify(sessionId),
    );
  }
}
