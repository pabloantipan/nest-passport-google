import { MciSessionsController } from '@controllers/mci-sessions/mci-sessions.controller';
import { MciSessionsLogic } from '@logics/mci-sessions/mci-sessions.logic';
import { Module } from '@nestjs/common';
import { EncryptionService } from '@services/encryption/encryption.service';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.service';
import { MongoDbStorageModule } from '@storage/mongodb-storage/mongodb-storage.module';
import { Utils } from '@utils/utils';

@Module({
  imports: [MongoDbStorageModule],
  controllers: [MciSessionsController],
  providers: [MciSessionsLogic, MciSessionsService, EncryptionService, Utils],
})
export class MciSessionsModule {}
