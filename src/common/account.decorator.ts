import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthAccount } from 'src/common/interfaces/AuthAccount.interface';

export const Account = createParamDecorator(function (
  data: unknown,
  ctx: ExecutionContext,
): AuthAccount {
  const request = ctx.switchToHttp().getRequest();
  return request.account;
});
