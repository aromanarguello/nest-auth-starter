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
import { User } from 'src/user/entities/user.entity';

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
    const user = await this.validateUserCredentials({ email, password });

    delete user.password;

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async logOut(userId: string): Promise<void> {
    this.userservice.updateToken(userId, null);
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userservice.findOne({
      where: { id: userId },
      select: ['id', 'refreshToken'],
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const rtMatches = rt === user.refreshToken;

    const validToken = await this.jwtService.verifyAsync(rt, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    if (!rtMatches && !validToken)
      throw new ForbiddenException('Invalid credentials');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async validateUserCredentials({
    email,
    password,
  }: UserCredentialsDto): Promise<User> {
    const user = await this.userservice.findOne({
      where: { email },
      select: ['id', 'password', 'email', 'role'],
    });
    const isValid = await compare(password, user.password);

    delete user.password;

    if (user && isValid) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getTokens(userId: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        { expiresIn: '10m', secret: process.env.ACCESS_TOKEN_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '3d',
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
