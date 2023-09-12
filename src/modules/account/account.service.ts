import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const existEmail = await this.accountRepository.exist({
      where: { email: createAccountDto.email },
    });

    if (existEmail) {
      throw new BadRequestException('email is already exists');
    }

    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async findAll() {
    return this.accountRepository.find({});
  }

  async findOne(id: string) {
    return this.accountRepository.findOneByOrFail({ id });
  }

  async update(id: string, dto: UpdateAccountDto) {
    if (dto.email) {
      const isEmailExists = await this.accountRepository.exist({
        where: { email: dto.email },
      });
      if (isEmailExists)
        throw new BadRequestException('email is already exists');
    }

    return this.accountRepository.update(id, dto);
  }

  async delete(id: string) {
    const existAccount = await this.accountRepository.exist({ where: { id } });

    if (!existAccount) {
      throw new BadRequestException('account not found');
    }
    return this.accountRepository.delete({ id });
  }
}
