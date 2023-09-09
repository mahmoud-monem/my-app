import { Body, Controller, Post } from '@nestjs/common';

import { Account } from 'src/entities/account.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthenticationLocalController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<Account> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  RegisterDoctor(@Body() registerDto: RegisterDto): Promise<Account> {
    return this.authService.register(registerDto);
  }
}
