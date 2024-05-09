import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'The username cannot be empty',
  })
  username: string;

  @IsEmail(undefined, { message: 'The email provided is invalid' })
  @IsNotEmpty()
  @EmailIsUnique({ message: 'There is already a user with this email' })
  email: string;

  @MinLength(6, {
    message: 'Checks if the password is longer than 6 characteres',
  })
  password: string;

}
