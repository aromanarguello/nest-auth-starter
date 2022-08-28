import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user['sub'];
});
