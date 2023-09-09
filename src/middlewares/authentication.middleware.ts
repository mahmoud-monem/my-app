import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthAccount } from 'src/common/interfaces/AuthAccount.interface';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      req['account'] = this._publicAccount();
      return next();
    }
    const jwtPayload = await this.jwtService.verifyAsync(authorization);
    if (jwtPayload) {
      const { sub } = jwtPayload;
      req['account'] = await this._findAndValidateAccount(sub);
      return next();
    }
    throw new ForbiddenException('Invalid Account');
  }

  _publicAccount(): AuthAccount {
    return {
      id: null,
      role: 'public',
    } as AuthAccount;
  }

  async _findAndValidateAccount(id: string): Promise<AuthAccount> {
    try {
      const user = await this.accountRepository.findOneByOrFail({ id });
      return {
        id: user.id,
        role: user.role,
      } as AuthAccount;
    } catch (err) {
      throw new ForbiddenException('Invalid Account');
    }
  }
}
