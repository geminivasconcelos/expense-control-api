import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense.controller';
import { ExpenseEntity } from './expense.entity';
import { ExpenseService } from './expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  providers: [ExpenseService],
  controllers: [ExpenseController, ExpenseController],
})
export class ExpenseModule {}
