import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const ENTITIES = [Account];

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): MysqlConnectionOptions {
    return {
      type: 'mysql',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: ENTITIES,
      synchronize: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
      logging: false,
    };
  }
}
