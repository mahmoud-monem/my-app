import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor() {}

  SALT_ROUNDS = 10;

  createHash(text: string): string {
    return hashSync(text, genSaltSync(this.SALT_ROUNDS));
  }

  compareHash(text: string, hash: string): boolean {
    return compareSync(text, hash);
  }
}
