import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseEntity } from './expense.entity';
import { CreateExpenseDTO } from './dto/CreateExpense.dto';
import { v4 as uuid } from 'uuid';
import { ExpenseListDTO } from './dto/ExpenseList.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseEervice: ExpenseService) {}

  @Post()
  async criateUser(@Body() dataExpense: CreateExpenseDTO) {
    const expenseEntity = new ExpenseEntity();
    expenseEntity.name = dataExpense.name;
    expenseEntity.typeExpense = dataExpense.typeExpense;
    expenseEntity.valueExpense = dataExpense.valueExpense;
    expenseEntity.typePayment = dataExpense.typePayment;
    expenseEntity.user = dataExpense.user;
    expenseEntity.id = uuid();

    const returnCreateUser =
      await this.expenseEervice.createExpense(expenseEntity);
    console.log(returnCreateUser)
    return {
      message: 'Expense created successfully!',
      expense: new ExpenseListDTO(
        expenseEntity.id,
        expenseEntity.name,
        expenseEntity.typeExpense,
        expenseEntity.valueExpense,
        expenseEntity.typePayment,
        expenseEntity.createdAt,
        expenseEntity.updatedAt,
        expenseEntity.user,
      ),
    };
  }
}
