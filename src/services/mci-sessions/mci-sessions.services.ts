import { CreateMciSessionDto } from '@dtos/mci-sessions/create-mci-session.dto';
import { Injectable } from '@nestjs/common';
import { MciSession } from '@schemas/mci-session.schema';
import { MongoDbService } from '@services/mongodb/mongodb.service';

@Injectable()
export class MciSessionsService {
  constructor(private mongoDbService: MongoDbService) {}

  async create(createMciSession: CreateMciSessionDto): Promise<MciSession> {
    return this.mongoDbService.create(createMciSession);
  }

  async findAll(): Promise<MciSession[]> {
    return this.mongoDbService.findAll();
  }

  async findBySessionId(sessionId: string): Promise<MciSession> {
    return this.mongoDbService.findBySessionId(sessionId);
  }
}
