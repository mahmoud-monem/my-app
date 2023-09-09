import { AccountRole } from 'src/common/constant/account-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'integer', default: 0 })
  quizDegree: number;

  @Column({ type: 'integer', default: 0 })
  quizCount: number;

  @Column({ enum: AccountRole, default: AccountRole.USER })
  role: AccountRole;
}
