import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { UsersStorageModule } from '@storage/users/users-storage.module';
import { defaultConnection } from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        'src/config/environments/dev.env',
        'src/config/environments/firebase.env',
        'src/config/environments/firebase.remote.env',
      ],
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(defaultConnection),
    UsersStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
