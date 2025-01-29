import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDTO, @Res({ passthrough: true }) response: Response) {
    const { access_token, refresh_token } = await this.authService.validateUser(authDto.email, authDto.password);
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    response.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 min
    })

    return { message: 'Login successful' };
  }
}
