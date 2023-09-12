import { Module } from '@nestjs/common';

import { CryptoService } from 'src/common/crypto.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Question } from 'src/entities/question.entity';
import { QuestionController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Account])],
  providers: [QuizService, CryptoService],
  controllers: [QuestionController],
})
export class QuizModule {}
