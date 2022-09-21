import { MciSessionsController } from '@controllers/mci-sessions/mci-sessions.controller';
import { MciSessionsLogic } from '@logics/mci-sessions/mci-sessions.logic';
import { Module } from '@nestjs/common';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.services';
import { MongoDbStorageModule } from '@storage/mongodb-storage/mongodb-storage.module';

@Module({
  imports: [MongoDbStorageModule],
  controllers: [MciSessionsController],
  providers: [MciSessionsLogic, MciSessionsService],
})
export class MciSessionsModule {}
