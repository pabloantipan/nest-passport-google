import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MciSession, MciSessionDocument } from '@schemas/mci-session.schema';
import { EncryptionService } from '@services/encryption/encryption.service';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(MciSession.name, 'session-mongodb')
    private mciSessionModel: Model<MciSessionDocument>,
    private encryptionService: EncryptionService,
  ) {
    this.encryptionService.setKey();
  }

  public async create(
    createMciSession: CreateMciSessionDto,
  ): Promise<MciSession> {
    // Get user Id
    const userId = createMciSession.userId;
    // Get current time
    const currentDate = new Date();
    // Build sessionId
    const sessionId = `${userId}-${currentDate}=${Math.floor(
      Math.random() * 10000,
    )}`;
    const encryptedSessionId = await this.encryptionService.encrypt(sessionId);

    // Set session duration in secs
    const sessionDuration = 30;
    // Set session alive
    const setSessionAlive = true;
    // Set terminated null
    const setSessionTerminatedOn = null;

    const newMciSession = {
      sessionId: encryptedSessionId,
      userId,
      createdOn: currentDate,
      duration: sessionDuration,
      alive: setSessionAlive,
      setSessionTerminatedOn,
    };

    const createdMciSession = new this.mciSessionModel(newMciSession);
    return createdMciSession.save();
  }

  public async findAll(): Promise<MciSession[]> {
    return this.mciSessionModel.find().exec();
  }

  public async findBySessionId(sessionId: string): Promise<MciSession> {
    return this.mciSessionModel.findOne({ sessionId }).exec();
  }
}
