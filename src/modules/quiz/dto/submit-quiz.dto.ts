export class QuestionDto {
  id: string;
  context: string;
  answer: string;
}

export class SubmitQuizDto {
  questions: QuestionDto[];
}
