import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  context: string;

  @Column()
  answer: string;
}
