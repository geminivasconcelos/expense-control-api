import { Injectable } from '@nestjs/common';
import { UserRepository } from './../user.repository';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userWithEmailExists =
      await this.userRepository.existsWithEmail(value);
    return !userWithEmailExists;
  }
}

export const EmailIsUnique = (optionsValidations: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidations,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
