import { JwtPayloadWithRt } from 'src/auth/types/token.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: currentUser.decorator.ts ~ line 7 ~ request',
      request.user,
    );
    if (!data) return request.user;
    return request.user;
  },
);
