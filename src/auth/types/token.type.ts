import { User } from 'src/user/user.entity';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserWithTokens = {
  user: User;
  tokens: Tokens;
};
