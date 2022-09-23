import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { defaultConnection } from '../ormconfig';
import { UsersModule } from '@modules/users.module';
import { AuthModule } from '@modules/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { MciSessionsModule } from '@modules/mci-sessions.module';

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
    AuthModule,
    TypeOrmModule.forRoot(defaultConnection),
    PassportModule.register({ session: true }),
    UsersModule,
    MongooseModule,
    MciSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
