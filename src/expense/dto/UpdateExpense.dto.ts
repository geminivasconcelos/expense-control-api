import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

export class UpdateExpenseDTO {
  @IsNotEmpty({
    message: 'The username cannot be empty',
  })
  @IsOptional()
  name: string;

  @IsOptional()
  typeExpense: string;

  @MinLength(3, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  @IsOptional()
  typePayment: string;

  @MinLength(3, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  user: UserEntity;

  @IsNumber()
  @IsOptional()
  valueExpense: number;
}