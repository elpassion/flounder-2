import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { StringValidations } from './StringValidations';

@ValidatorConstraint({ name: 'mustContainUpperCase', async: false })
export class MustContainUpperCaseValidator implements ValidatorConstraintInterface {
  validate(password: unknown) {
    return typeof password === 'string' && StringValidations.containsUpperCase(password);
  }
}

@ValidatorConstraint({ name: 'mustContainLowerCase', async: false })
export class MustContainLowerCaseValidator implements ValidatorConstraintInterface {
  validate(password: unknown) {
    return typeof password === 'string' && StringValidations.containsLowerCase(password);
  }
}

@ValidatorConstraint({ name: 'mustContainNumber', async: false })
export class MustContainNumberValidator implements ValidatorConstraintInterface {
  validate(password: unknown) {
    return typeof password === 'string' && StringValidations.containsNumber(password);
  }
}

@ValidatorConstraint({ name: 'mustContainOnlyAllowedCharacters', async: false })
export class MustContainOnlyAllowedCharactersValidator implements ValidatorConstraintInterface {
  validate(password: unknown) {
    return (
      typeof password === 'string' && StringValidations.containsOnlyAllowedCharacters(password)
    );
  }
}
