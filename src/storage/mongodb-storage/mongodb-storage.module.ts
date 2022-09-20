import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getConnectionToken,
  InjectModel,
  MongooseModule,
} from '@nestjs/mongoose';
import {
  MciSession,
  MciSessionDocument,
  MciSessionSchema,
} from '@schemas/mci-session.schema';
import { MongoDbService } from '@services/mongodb/mongodb.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'session-mongodb',
      useFactory: async (configService: ConfigService) => ({
        uri: await configService.get<string>('mongo.uri'),
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // MongoDbService,
    MongooseModule.forFeatureAsync(
      [
        {
          name: MciSession.name,
          useFactory: async () => {
            const schema = MciSessionSchema;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            schema.plugin(require('mongoose-autopopulate'));
            schema.pre('save', () => {
              console.log('Hello from pre save');
            });
            return schema;
          },
        },
      ],
      'session-mongodb',
    ),
  ],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbStorageModule {}
