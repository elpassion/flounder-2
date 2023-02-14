import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ConfigValidator {
  public static validate<T>(cls: ClassConstructor<T>, config: Record<keyof T, unknown>): T {
    const validatedConfig = plainToInstance(cls, config, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });

    const errors = validateSync(validatedConfig as unknown as Record<string, unknown>, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}
