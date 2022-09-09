import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserId, Public } from 'src/common/decorators';
import {
  CreateUserDto,
  UserCredentialsDto,
} from 'src/user/dto/user-credentials.dto';

import { AuthService } from './auth.service';
import { RtGuard } from './guards/rt.guard';

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
    res.cookie('refresh', 'Bearer ' + tokens.refresh_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });
    res.cookie('access', 'Bearer ' + tokens.access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1,
    });
    return { user };
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() req: UserCredentialsDto,
  ) {
    const { user, tokens } = await this.authService.signIn(req);

    res.cookie('refresh', 'Bearer ' + tokens.refresh_token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 3),
    });
    res.cookie('access', 'Bearer ' + tokens.access_token, {
      secure: true,
      httpOnly: true,
    });

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@CurrentUserId() userId: string) {
    return this.authService.logOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @CurrentUserId() userId: string,
    @CurrentUser() user: any,
  ) {
    const tokens = await this.authService.refreshTokens(
      userId,
      user.refreshToken,
    );

    res.cookie('refresh', 'Bearer ' + tokens.refresh_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
    });
    res.cookie('access', 'Bearer ' + tokens.access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 1 * 1000,
    });

    return { message: 'refreshed' };
  }
}
