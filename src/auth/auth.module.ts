import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [],
  providers: [],
})
export class AuthModule {}
