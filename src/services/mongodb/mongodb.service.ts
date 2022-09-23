import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MciSession, MciSessionDocument } from '@schemas/mci-session.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(MciSession.name, 'session-mongodb')
    private mciSessionModel: Model<MciSessionDocument>,
  ) {}

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
