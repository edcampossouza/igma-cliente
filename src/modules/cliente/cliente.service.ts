import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';
import { validaCpf } from '../../util/cpf.validator';
import { ClienteModel } from '@prisma/client';
import { QueryClienteDto } from './dto/query-cliente.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const REGISTROS_POR_PAGINA = 5;

@Injectable()
export class ClienteService {
  constructor(private db: PrismaService) {}
  async criarCliente(clienteDto: ClienteDto): Promise<ClienteModel> {
    if (!validaCpf(clienteDto.cpf))
      throw new UnprocessableEntityException('Cpf inválido');
    clienteDto.cpf = this.removeMascara(clienteDto.cpf);
    try {
      const cliente = await this.db.clienteModel.create({ data: clienteDto });
      return cliente;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Cpf já cadastrado');
      }
    }
  }

  async clientePorCpf(cpf: string): Promise<ClienteModel> {
    if (!validaCpf(cpf)) throw new NotFoundException();
    cpf = this.removeMascara(cpf);
    const cliente = await this.db.clienteModel.findUnique({ where: { cpf } });
    if (!cliente) throw new NotFoundException();
    return cliente;
  }

  async clientes(query: QueryClienteDto): Promise<ClienteModel[]> {
    if (query.page) {
      return this.db.clienteModel.findMany({
        skip: (query.page - 1) * REGISTROS_POR_PAGINA,
        take: REGISTROS_POR_PAGINA,
      });
    }
    return this.db.clienteModel.findMany({});
  }

  removeMascara(cpf: string): string {
    return cpf.replace(/[\D]/g, '');
  }
}
