import { Model } from 'mongoose';
import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MciSession, MciSessionDocument } from '@schemas/mci-session.schema';

@Injectable()
export class MciSessionsService {
  constructor(
    @InjectModel(MciSession.name)
    private mciSessionModel: Model<MciSessionDocument>,
  ) {}

  async create(createMciSession: CreateMciSessionDto): Promise<MciSession> {
    const createdMciSession = new this.mciSessionModel(createMciSession);
    return createdMciSession.save();
  }

  async findAll(): Promise<MciSession[]> {
    return this.mciSessionModel.find().exec();
  }
}
