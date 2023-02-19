import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsMatch(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsMatchValidator,
    });
  };
}

@ValidatorConstraint({ name: 'IsMatch', async: false })
class IsMatchValidator implements ValidatorConstraintInterface {
  validate(value: string, { constraints, object }: ValidationArguments) {
    const [comparedPropertyName] = constraints;
    const comparedValue = (object as any)[comparedPropertyName];
    return value === comparedValue;
  }

  defaultMessage() {
    return 'Passwords must match!';
  }
}
