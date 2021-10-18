import { registerDecorator, ValidateByOptions, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import {  isMatch } from "date-fns";


@ValidatorConstraint()
class IsDateStringConstraint implements ValidatorConstraintInterface {

  private readonly value: (input: string, dateFormat: string) => boolean

  constructor(){
    this.value = (input: string, dateFormat: string) => isMatch(input, dateFormat)
  }

  validate(text: string, args: ValidationArguments): boolean {
    return (this.value(text, 'MM/dd/yyyy'));
  }

  defaultMessage(args: ValidationArguments): string {
    const {property} = args;
    return `${property} should be in format MM/dd/yyyy or dd/MM/yyyy`
  }
}

export function IsDateStringCustom(validationOptions?: ValidateByOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions as ValidationOptions,
      validator: IsDateStringConstraint,
      async: false
    })
  }
}