import { CreateUserDto } from './../user/dto/user-credentials.dto';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCredentialsDto } from 'src/user/dto/user-credentials.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens, UserWithTokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private jwtService: JwtService,
  ) {}

  async singUp({
    email,
    password,
    role,
  }: CreateUserDto): Promise<UserWithTokens> {
    const user = await this.userservice.create({ email, password, role });
    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async signIn({
    email,
    password,
  }: UserCredentialsDto): Promise<UserWithTokens> {
    const user = await this.userservice.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    const isValid = await compare(password, user.password);

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    if (user && isValid) {
      return { user, tokens };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logOut(userId: string): Promise<void> {
    this.userservice.updateToken(userId, null);
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userservice.findOne({ where: { id: userId } });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const rtMatches = await compare(rt, user.refreshToken);

    if (!rtMatches) throw new ForbiddenException('Invalid credentials');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        { expiresIn: 60 * 15, secret: process.env.ACCESS_TOKEN_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: process.env.REFRESH_TOKEN_SECRET,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    this.userservice.updateToken(userId, rt);
  }
}
