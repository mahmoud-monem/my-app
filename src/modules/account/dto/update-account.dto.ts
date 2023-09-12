import { AccountRole } from 'src/common/constant/account-role.enum';

export class UpdateAccountDto {
  name: string;
  email: string;
  password: string;
  quizDegree: number;
  quizCount: number;
  role: AccountRole;
}
