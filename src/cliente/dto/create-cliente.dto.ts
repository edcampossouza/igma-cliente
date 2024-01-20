import { Type, Transform, TransformFnParams } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { IsCpf } from 'src/decorators/cpf-validator.decorator';

export class ClienteDto {
  @IsCpf({ message: 'Cpf inválido' })
  @Transform(({ value }: { value: string }) => value.replace(/[\D]/g, ''))
  cpf: string;
  @IsNotEmpty()
  nome: string;
  @Type(() => Date)
  @IsDate()
  dataDeNascimento: Date;
}
