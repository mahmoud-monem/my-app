import { Module } from '@nestjs/common';

import { CryptoService } from 'src/common/crypto.service';
import { StorageService } from 'src/common/storage.service';
import { ConfigurationModule } from 'src/config/configuration.module';
import { DatabaseModule } from 'src/database/database.module';

import { AccountFCMTokenModule } from './account-fcm-token/account-fcm-token.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule, ConfigurationModule, AccountFCMTokenModule],
  providers: [AccountService, CryptoService, StorageService],
  controllers: [AccountController],
  exports: [AccountFCMTokenModule],
})
export class AccountModule {}
