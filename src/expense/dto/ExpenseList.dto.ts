import { UserEntity } from "src/user/user.entity";

export class ExpenseListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly typeExpense: string,
    readonly valueExpense: number,
    readonly typePayment: string,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly user: string,
  ) {}
}
