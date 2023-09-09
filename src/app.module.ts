import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './common/crypto.service';
import { OrmConfig } from './config/orm.config';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'this is secret',
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
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
