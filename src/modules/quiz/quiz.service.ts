import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async takeQuiz() {
    return this.questionRepository
      .createQueryBuilder('question')
      .select(['id', 'context'])
      .orderBy('RANDOM()')
      .take(10)
      .getMany();
  }

  async submitQuiz(accountId: string, submitQuizDto: SubmitQuizDto) {
    let grade = 0;
    for (const question of submitQuizDto.questions) {
      const existQuestion = await this.questionRepository.exist({
        where: question,
      });

      if (existQuestion) {
        grade++;
      }
    }

    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new BadRequestException('account not found');
    }
    account.quizCount++;
    account.quizDegree = grade;
    return this.accountRepository.save(account);
  }
}
