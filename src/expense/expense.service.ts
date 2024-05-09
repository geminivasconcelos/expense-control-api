import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ExpenseListDTO } from './dto/ExpenseList.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async createExpense(expenseEntity: ExpenseEntity) {
    return await this.expenseRepository.save(expenseEntity);
  }

  async listExpense() {
    const expenseSaves = await this.expenseRepository.find({
      relations: ['user'],
    });
    const expenseList = expenseSaves.map(
      (expense) =>
        new ExpenseListDTO(
          expense.id,
          expense.name,
          expense.createdAt,
          expense.valueExpense,
          expense.typeExpense,
          expense.typePayment,
          expense.updatedAt,
          expense.user,
        ),
    );

    return expenseList;
  }

  async singleExpense(id: string) {
    const expenseSaves = await this.expenseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    const expenseList = new ExpenseListDTO(
      expenseSaves.id,
      expenseSaves.name,
      expenseSaves.createdAt,
      expenseSaves.valueExpense,
      expenseSaves.typeExpense,
      expenseSaves.typePayment,
      expenseSaves.updatedAt,
      expenseSaves.user,
    );

    return expenseList;
  }

  async updateExpense(id: string, expenseEntity) {
    await this.expenseRepository.update(id, expenseEntity);
  }

  async deleteExpense(id: string) {
    await this.expenseRepository.delete(id);
  }
}
