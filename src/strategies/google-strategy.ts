import { AuthLogic } from '@logics/auth/auth.logic';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@services/users/users.service';
import { Profile, Strategy } from 'passport-google-oauth20';

// reference: https://youtu.be/OitgkKTxht4
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authLogic: AuthLogic,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get('oauth.clientId'),
      clientSecret: configService.get('oauth.clientSecret'),
      callbackURL: configService.get('oauth.callbackUrl'),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authLogic.validateUser(profile._json.email);
    return user || null;
  }
}
