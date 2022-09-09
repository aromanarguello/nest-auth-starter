import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['access'];

          if (!data) {
            return null;
          }

          return data.split('Bearer ')[1];
        },
      ]),
    });
  }

  validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub };
  }
}
