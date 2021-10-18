import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import Container from "typedi";
import { BaseService } from "../../services/base.service";

export function IsUniqueCustom(
  service: Function,
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions as ValidationOptions,
      validator: {
        async validate(
          value: string,
          args: ValidationArguments
        ): Promise<boolean> {
          const serviceInstance = Container.get(service) as BaseService<any>;
          try {
            await serviceInstance.getById(undefined, {
              [args.property]: value,
            });
            return false;
          } catch {
            return true;
          }
        },
        defaultMessage(args: ValidationArguments): string {
          const { property } = args;
          return `${property} already exists in this entity - not unique`;
        },
      },
    });
  };
}
