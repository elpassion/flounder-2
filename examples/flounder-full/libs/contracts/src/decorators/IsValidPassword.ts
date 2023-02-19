import { IsNotEmpty, IsString, MinLength, ValidationArguments } from 'class-validator';
import {
  MustContainUpperCase,
  MustContainLowerCase,
  MustContainNumber,
  MustContainOnlyAllowedCharacters,
} from './stringDecorators';

export function IsValidPassword(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsString({ message: 'Must be text format' })(target, propertyKey);
    IsNotEmpty({ message: 'You have to provide password' })(target, propertyKey);
    MinLength(6, {
      message: (args: ValidationArguments) =>
        `Min ${args.constraints[0]} chars`,
    })(target, propertyKey);
    MustContainUpperCase({ message: 'At least one uppercase letter' })(
      target,
      propertyKey,
    );
    MustContainLowerCase({ message: 'At least one lowercase letter' })(
      target,
      propertyKey,
    );
    MustContainNumber({ message: 'At least one number' })(target, propertyKey);
    MustContainOnlyAllowedCharacters({
      message: 'Allowed special characters: @$!%*?&#',
    })(target, propertyKey);
  };
}
