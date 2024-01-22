import {
  BadRequestException,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    let cpfError = false;
    const result = errors.map((error) => {
      if (error.property === 'cpf') cpfError = true;
      return error.constraints[Object.keys(error.constraints)[0]];
    });
    return cpfError
      ? new UnprocessableEntityException(result)
      : new BadRequestException(result);
  },
});
