import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CryptoService } from './common/crypto.service';
import { OrmConfig } from './config/orm.config';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { AccountModule } from './modules/account/account.module';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'this is secret',
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
    AuthModule,
    AccountModule,
    QuestionModule,
  ],
  providers: [CryptoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
