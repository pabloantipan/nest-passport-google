import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { Injectable } from '@nestjs/common';
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
    private utils: Utils,
  ) {
    this.encryptionService.setKey();
  }

  public async sessionUp(userId: string): Promise<MciSession> {
    // Get current time
    const currentDate = new Date();
    // Build sessionId
    const sessionId = `${userId}-${currentDate}=${Math.floor(
      Math.random() * 10000,
    )}`;
    const encryptedSessionId =
      await this.encryptionService.encryptToLegibleString(sessionId);

    // Set session alive
    const setSessionAlive = true;
    // Set terminated null
    const setSessionTerminatedOn = this.utils.addLapseTimeToDate(
      currentDate,
      MCI_SESSION_DURATION_SEC,
    );

    const newMciSession = {
      sessionId: encryptedSessionId,
      userId,
      createdOn: currentDate,
      duration: MCI_SESSION_DURATION_SEC,
      alive: setSessionAlive,
      terminateOn: setSessionTerminatedOn,
    } as MciSessionInterface;

    return this.mciSessionsService.create(newMciSession);
  }

  public async validate(token: string): Promise<MciSession[]> {
    return this.mciSessionsService.findAll();
  }

  public async sessionDown(token: string): Promise<boolean> {
    return true;
  }
}
