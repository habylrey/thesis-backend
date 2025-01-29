import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './DTO/jwt-payload.interface';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.access_token
      ]),
      secretOrKey: process.env.SECRET_JWT,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    try {
      return { 
        userId: payload.sub, 
        email: payload.email 
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}