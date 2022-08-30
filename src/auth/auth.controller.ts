import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CurrentUserId, Public } from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
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

  // @Public()
  @UseGuards(AtGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() req: UserCredentialsDto,
  ) {
    const { user, tokens } = await this.authService.signIn(req);

    res.cookie('jwt', 'Bearer ' + tokens.access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    return { user, accessToken: tokens.access_token };
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@CurrentUserId() userId: string) {
    return this.authService.logOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request, @Res() res: Response) {
    // const userId = req.user['sub'];
    // return this.authService.refreshTokens(userId);
  }
}
