import { AssertionError } from 'assert';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export async function assertIsDTO<T extends ClassConstructor<any>>(
  DTO: T,
  payload: unknown,
): Promise<InstanceType<T>> {
  try {
    const instance = plainToClass(DTO, payload);
    const errors = await validate(instance);

    if (errors.length > 0) throw new Error('Validation failed');

    return instance as InstanceType<T>;
  } catch (e) {
    throw new AssertionError({ message: `This is not a ${DTO.name}` });
  }
}
