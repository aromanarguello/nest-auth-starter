import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from 'src/user/dto/user-credentials.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { UserWithTokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<UserWithTokens> {
    return this.authService.singUp(userCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<UserWithTokens> {
    return this.authService.signIn(userCredentialsDto);
  }

  @Post('/logout')
  logOut() {
    // return this.authService.logOut();
  }
}
