export class StringValidations {
  static containsUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }
  static containsLowerCase(value: string): boolean {
    return /[a-z]/.test(value);
  }

  static containsNumber(value: string): boolean {
    return /\d/.test(value);
  }

  static containsOnlyAllowedCharacters(value: string): boolean {
    return /^[A-Za-z\d@$!%*?&#]+$/.test(value);
  }
}
