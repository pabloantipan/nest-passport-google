import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MciSession, MciSessionSchema } from '@schemas/mci-session.schema';
import { MciSessionsService } from '@services/mci-sessions/mci-sessions.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MciSession.name, schema: MciSessionSchema },
    ]),
  ],
  controllers: [],
  providers: [MciSessionsService],
})
export class MciSessionsModule {}
