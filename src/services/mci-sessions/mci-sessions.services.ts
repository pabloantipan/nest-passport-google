import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { Injectable } from '@nestjs/common';
import { MciSession } from '@schemas/mci-session.schema';
import { MongoDbService } from '@services/mongodb/mongodb.service';

@Injectable()
export class MciSessionsService {
  constructor(private mongoDbService: MongoDbService) {}

  async create(mciSession: MciSessionInterface): Promise<MciSession> {
    return this.mongoDbService.create(mciSession);
  }

  async findAll(): Promise<MciSession[]> {
    return this.mongoDbService.findAll();
  }

  async findBySessionId(sessionId: string): Promise<MciSession> {
    return this.mongoDbService.findBySessionId(sessionId);
  }
}
