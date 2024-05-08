import {
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

export class CreateExpenseDTO {
  @IsNotEmpty({
    message: 'The username cannot be empty',
  })
  name: string;

  @MinLength(3, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  typeExpense: string;

  @MinLength(3, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  typePayment: string;

  @MinLength(3, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  user: UserEntity;

  @IsNumber()
  valueExpense: number;
}
