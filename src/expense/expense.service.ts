import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async createExpense(expenseEntity: ExpenseEntity) {
    console.log(expenseEntity)
    return await this.expenseRepository.save(expenseEntity);
  }
}
