import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaOfMciSession, MciSessionDocument } from '@schemas/mci-session.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(SchemaOfMciSession.name, 'session-mongodb')
    private mciSessionModel: Model<MciSessionDocument>,
  ) {}

  public async create(mciSession: MciSessionInterface): Promise<SchemaOfMciSession> {
    const createdMciSession = new this.mciSessionModel(mciSession);
    return createdMciSession.save();
  }

  public async findAll(): Promise<SchemaOfMciSession[]> {
    return this.mciSessionModel.find().exec();
  }

  public async findSessionByToken(sessionId: string): Promise<SchemaOfMciSession[]> {
    return this.mciSessionModel.find({ sessionId }).exec();
  }

  public async findAliveSessionsOfUser(userId: string): Promise<SchemaOfMciSession[]> {
    return this.mciSessionModel.find({ userId, alive: true }).exec();
  }

  public async killSessionsByToken(tokens: string[]): Promise<any> {
    return this.mciSessionModel.updateMany(
      { sessionId: { $in: tokens } },
      { $set: { alive: false } },
      { multi: true },
    );
  }
}
