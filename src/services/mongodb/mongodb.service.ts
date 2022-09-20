import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MciSession, MciSessionDocument } from '@schemas/mci-session.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectConnection('session-mongodb') private connection: Connection,
    @InjectModel(MciSession.name, 'session-mongodb')
    private mciSessionModel: Model<MciSessionDocument>,
  ) {
    // this.connection.getClient().connect();
  }

  public async create(
    createMciSession: CreateMciSessionDto,
  ): Promise<MciSession> {
    const createdMciSession = new this.mciSessionModel(createMciSession);
    return createdMciSession.save();
  }

  public async findAll(): Promise<MciSession[]> {
    return this.mciSessionModel.find().exec();
  }
}
