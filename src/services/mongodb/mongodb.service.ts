import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MciSession, MciSessionDocument } from '@schemas/mci-session.schema';
import { EncryptionService } from '@services/encryption/encryption.service';
import { Utils } from '@utils/utils';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(MciSession.name, 'session-mongodb')
    private mciSessionModel: Model<MciSessionDocument>,
  ) {}

  public async create(mciSession: MciSessionInterface): Promise<MciSession> {
    const createdMciSession = new this.mciSessionModel(mciSession);
    return createdMciSession.save();
  }

  public async findAll(): Promise<MciSession[]> {
    return this.mciSessionModel.find().exec();
  }

  public async findBySessionId(sessionId: string): Promise<MciSession> {
    return this.mciSessionModel.findOne({ sessionId }).exec();
  }
}
