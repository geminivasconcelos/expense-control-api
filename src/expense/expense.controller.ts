import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseEntity } from './expense.entity';
import { CreateExpenseDTO } from './dto/CreateExpense.dto';
import { v4 as uuid } from 'uuid';
import { ExpenseListDTO } from './dto/ExpenseList.dto';
import { UpdateExpenseDTO } from './dto/UpdateExpense.dto';

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

  @Get()
  async listExpenses() {
    const savedExpenses = await this.expenseEervice.listExpense();
    return savedExpenses;
  }

  @Get('/:id')
  async listSingleExpenses(@Param('id') id: string) {
    const savedExpense = await this.expenseEervice.singleExpense(id);
    return savedExpense;
  }

  @Put('/:id')
  async putExpenses(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateExpenseDTO,
  ) {
    const savedExpense = await this.expenseEervice.updateExpense(
      id,
      dataToUpdate,
    );
    return savedExpense;
  }
}
