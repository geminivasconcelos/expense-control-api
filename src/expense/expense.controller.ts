import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

    const returnCreateExpense = await this.expenseEervice.createExpense(expenseEntity);
    return {
      message: 'Expense created successfully!',
      expense: new ExpenseListDTO(
        returnCreateExpense.id,
        returnCreateExpense.name,
        returnCreateExpense.typeExpense,
        returnCreateExpense.valueExpense,
        returnCreateExpense.typePayment,
        returnCreateExpense.createdAt,
        returnCreateExpense.updatedAt,
        returnCreateExpense.user,
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
    return {
      expense: savedExpense,
      message: 'Expense updated successfully!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const expenseRemoved = await this.expenseEervice.deleteExpense(id);

    return {
      user: expenseRemoved,
      message: 'Expense successfully deleted',
    };
  }
}
