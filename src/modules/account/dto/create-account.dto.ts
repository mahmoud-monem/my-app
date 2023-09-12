import { AccountRole } from 'src/common/constant/account-role.enum';

export class CreateAccountDto {
  name: string;
  email: string;
  password: string;
  role: AccountRole;
}
