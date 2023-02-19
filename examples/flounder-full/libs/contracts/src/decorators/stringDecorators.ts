import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  MustContainLowerCaseValidator,
  MustContainUpperCaseValidator,
  MustContainNumberValidator,
  MustContainOnlyAllowedCharactersValidator,
} from '../validators/StringValidators';

/* eslint-disable  @typescript-eslint/no-explicit-any */

export function MustContainUpperCase(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: MustContainUpperCaseValidator,
    });
  };
}

export function MustContainLowerCase(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: MustContainLowerCaseValidator,
    });
  };
}

export function MustContainNumber(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: MustContainNumberValidator,
    });
  };
}

export function MustContainOnlyAllowedCharacters(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: MustContainOnlyAllowedCharactersValidator,
    });
  };
}
