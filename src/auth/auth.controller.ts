import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUserId, Public } from 'src/common/decorators';
import {
  CreateUserDto,
  UserCredentialsDto,
} from 'src/user/dto/user-credentials.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() userCredentialsDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.singUp(userCredentialsDto);
    res.cookie('refresh', 'Bearer ' + tokens.refresh_token);
    return { user, accessToken: tokens.access_token };
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() req: UserCredentialsDto,
  ) {
    const { user, tokens } = await this.authService.signIn(req);

    res.cookie('auth-cookie', 'Bearer ' + tokens.access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    return { user, accessToken: tokens.access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@CurrentUserId() userId: string) {
    return this.authService.logOut(userId);
  }
}
