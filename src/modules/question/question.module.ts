import { Module } from '@nestjs/common';

import { CryptoService } from 'src/common/crypto.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService, CryptoService],
  controllers: [QuestionController],
})
export class QuestionModule {}
