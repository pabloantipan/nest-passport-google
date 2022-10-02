import { MciSessionInterface } from '@interfaces/mci-sessions/mci-session.interface';
import { Injectable } from '@nestjs/common';
import { SchemaOfMciSession } from '@schemas/mci-session.schema';
import { MongoDbService } from '@services/mongodb/mongodb.service';

@Injectable()
export class MciSessionsService {
  constructor(private mongoDbService: MongoDbService) {}

  async create(mciSession: MciSessionInterface): Promise<SchemaOfMciSession> {
    return this.mongoDbService.create(mciSession);
  }

  async findAll(): Promise<SchemaOfMciSession[]> {
    return this.mongoDbService.findAll();
  }

  async findSessionByToken(sessionId: string): Promise<SchemaOfMciSession[]> {
    return this.mongoDbService.findSessionByToken(sessionId);
  }

  async findAliveSessionsOfUser(sessionId: string): Promise<SchemaOfMciSession[]> {
    return this.mongoDbService.findAliveSessionsOfUser(sessionId);
  }

  async killSessionsByToken(tokens: string[]): Promise<any> {
    this.mongoDbService.killSessionsByToken(tokens);
  }
}
