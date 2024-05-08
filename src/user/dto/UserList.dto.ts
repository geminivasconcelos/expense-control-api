import { ExpenseEntity } from "src/expense/expense.entity";

export class UserListDTO {
  constructor(
    readonly id: string,
    readonly password: string,
    readonly username: string,
    readonly email: string,
    readonly expenses: ExpenseEntity[] = []
  ) {}
}
