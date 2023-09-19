import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Question } from 'src/entities/question.entity';

const ENTITIES = [Account, Question];

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'dpg-ck4ue5mi9prc73ahpang-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'quiz',
      password: '7WMYGzAePHPZgfgIJ9pqXzSzir3KsTk7',
      database: 'quiz_k01n',
      ssl: true,
      entities: ENTITIES,
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
      logging: false,
    };
  }
}
