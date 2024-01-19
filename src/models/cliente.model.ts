import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsCpf } from 'src/decorators/cpf-validator.decorator';

export class Cliente {
  id: number;
  @IsCpf({ message: 'Cpf inválido' })
  cpf: string;
  @IsNotEmpty()
  nome: string;
  @IsDateString()
  dataDeNascimento: Date;
}
