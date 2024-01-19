import { ValidationOptions, registerDecorator } from 'class-validator';
import { validaCpf } from 'src/util/cpf.validator';

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && validaCpf(value);
        },
      },
    });
  };
}
