import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAccountDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const existContext = await this.questionRepository.exist({
      where: { context: createQuestionDto.context },
    });

    if (existContext) {
      throw new BadRequestException('question is already exists');
    }

    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async findAll() {
    return this.questionRepository.find({});
  }

  async findOne(id: string) {
    return this.questionRepository.findOneByOrFail({ id });
  }

  async update(id: string, dto: UpdateAccountDto) {
    const existContext = await this.questionRepository.exist({
      where: { context: dto.context },
    });

    if (existContext) {
      throw new BadRequestException('question is already exists');
    }

    return this.questionRepository.update(id, dto);
  }

  async delete(id: string) {
    const existQuestion = await this.questionRepository.exist({
      where: { id },
    });

    if (!existQuestion) {
      throw new BadRequestException('question not found');
    }
    return this.questionRepository.delete({ id });
  }
}
