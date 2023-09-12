import { Module } from '@nestjs/common';

import { CryptoService } from 'src/common/crypto.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, CryptoService],
  controllers: [AccountController],
})
export class AccountModule {}
