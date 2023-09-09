import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/crypto.service';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private cryptoService: CryptoService,
  ) {}

  async login(loginDto: LoginDto) {
    const account = await this.accountRepository.findOneBy({
      email: loginDto.email,
    });

    if (!account) {
      throw new NotFoundException('email not found');
    }
    if (!this.cryptoService.compareHash(loginDto.password, account.password)) {
      throw new BadRequestException('wrong password');
    }
    return account;
  }

  async register(registerDto: RegisterDto) {
    const existAccount = await this.accountRepository.findOneBy({
      email: registerDto.email,
    });

    if (existAccount) {
      throw new BadRequestException('this email already exists');
    }
    registerDto.password = this.cryptoService.createHash(registerDto.password);
    const account = this.accountRepository.create(registerDto);

    return this.accountRepository.save(account);
  }
}
