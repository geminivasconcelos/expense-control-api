import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ExpenseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
