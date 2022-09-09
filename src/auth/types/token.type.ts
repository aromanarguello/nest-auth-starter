import { User } from 'src/user/entities/user.entity';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserWithTokens = {
  user: User;
  tokens: Tokens;
};

export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
