import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.use(cookieSession({ keys: [configService.get('cookieSession.secret')] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    session({
      secret: configService.get('googleStrategy.secret'),
      saveUninitialized: configService.get('googleStrategy.saveUninitialized'),
      resave: configService.get('googleStrategy.reSave'),
      cookie: {
        maxAge: configService.get('googleStrategy.cookie.maxAge'),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
