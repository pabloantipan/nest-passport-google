import {
  MaxMultiSessionReached,
  MultiSessionIsNotAllowed,
  SessionDoesNotExist,
  SessionHasJustTerminated,
  SessionWasAlreadyTerminated,
} from '@exceptions/exceptions';
import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { SessionIdInterface } from '@interfaces/mci-sessions/session-id.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MciSession } from '@schemas/mci-session.schema';
import { EncryptionService } from '@services/encryption/encryption.service';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.service';
import { Utils } from '@utils/utils';

const MCI_SESSION_DURATION_SEC = 120;

@Injectable()
export class MciSessionsLogic {
  multiSessionAllowed: boolean;
  maxSessionsLimit: number;

  constructor(
    private mciSessionsService: MciSessionsService,
    private encryptionService: EncryptionService,
    private configService: ConfigService,
    private utils: Utils,
  ) {
    this.encryptionService.setKey();
    this.multiSessionAllowed = this.configService.get(
      'sessions.multiSessionAllowed',
    );
    this.maxSessionsLimit = this.configService.get('sessions.maxSessionsLimit');
  }

  public async getAliveSessionOfUser(userId: string) {
    const aliveUserSessions =
      await this.mciSessionsService.findAliveSessionsOfUser(userId);
    const currentTime = new Date();
    const sessionsToKill = aliveUserSessions.filter(
      (session) => session.terminateOn.getTime() <= currentTime.getTime(),
    );
    const tokensToKill = sessionsToKill.map((session) => session.sessionId);
    if (tokensToKill.length > 0) {
      await this.mciSessionsService.killSessionsByToken(tokensToKill);
    }
    return aliveUserSessions.filter(
      (session) => session.terminateOn.getTime() > currentTime.getTime(),
    );
  }

  public async sessionUp(userId: string): Promise<MciSession> {
    // watch out for multiSession condition and maxSessionsLimit
    const aliveUserSessions = await this.getAliveSessionOfUser(userId);
    const actualAliveSessions = aliveUserSessions.length;
    if (!this.multiSessionAllowed) {
      throw new MultiSessionIsNotAllowed();
    }
    if (actualAliveSessions >= this.maxSessionsLimit) {
      throw new MaxMultiSessionReached();
    }
    // up new session
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

  public async validate(sessionId: string): Promise<any> {
    // get token data from db
    const sessionData = await this.mciSessionsService.findSessionByToken(
      sessionId,
    );
    if (sessionData.length === 0)
      throw new SessionDoesNotExist('Session does not exist');
    // get if session is alive
    if (!sessionData[0].alive) throw new SessionWasAlreadyTerminated();

    const currentDate = new Date();
    if (sessionData[0].terminateOn.getTime() <= currentDate.getTime()) {
      // kill session if time out
      this.mciSessionsService.killSessionsByToken([sessionId]);
      throw new SessionHasJustTerminated();
    }
    // return validation
    return 'Session is valid';
  }

  public async sessionDown(sessionId: string): Promise<boolean> {
    return this.mciSessionsService
      .killSessionsByToken([sessionId])
      .then(() => true)
      .catch((e) => e);
  }

  private async generateSessionId(userId: string, currentDate: Date) {
    const sessionId = {
      userId,
      serverValidator: this.configService.get('SERVICE_IDENTITY'),
      createdOn: currentDate,
      randomKey: Math.floor(Math.random() * 10000),
    } as SessionIdInterface;

    return await this.encryptionService.encrypt(JSON.stringify(sessionId));
  }
}
