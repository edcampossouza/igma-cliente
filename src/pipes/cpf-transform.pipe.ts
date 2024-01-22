import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

/**
 * Pipe para remover a máscara do cpf na requisição
 */
@Injectable()
export class CpfPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    return value.replace(/[\D]/g, '');
  }
}
