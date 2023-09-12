import { Body, Controller, Get, Post } from '@nestjs/common';

import { Account } from 'src/common/account.decorator';
import { AuthAccount } from 'src/common/interfaces/AuthAccount.interface';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  submitQuiz(
    @Body() submitQuizDto: SubmitQuizDto,
    @Account() authAccount: AuthAccount,
  ) {
    return this.quizService.submitQuiz(authAccount.id, submitQuizDto);
  }

  @Get()
  takeQuiz() {
    return this.quizService.takeQuiz();
  }
}
