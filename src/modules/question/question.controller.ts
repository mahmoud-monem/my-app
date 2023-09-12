import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAccountDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateQuestionDto: UpdateAccountDto, @Param('id') id: string) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
