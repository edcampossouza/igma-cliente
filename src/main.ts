import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, whitelist: true,
    exceptionFactory: (errors: ValidationError[]) => {
      let cpfError = false
      const result = errors.map((error) => {
        if (error.property === 'cpf')
          cpfError = true
        return error.constraints[Object.keys(error.constraints)[0]]
      })
      return cpfError ? new UnprocessableEntityException(result) : new BadRequestException(result);
    },

  }));
  await app.listen(3000);
}
bootstrap();
