import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';


@Module({
  providers: [AuthService, UserModule, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: ['.env'],
  }), UserModule, PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '60m' }, 
    })],
  exports: [JwtAuthGuard, AuthService]
})
export class AuthModule {}
