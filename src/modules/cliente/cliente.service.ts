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
import { ClienteResponseDto } from './dto/cliente-response.dto';

const REGISTROS_POR_PAGINA = 10;

@Injectable()
export class ClienteService {
  constructor(private repo: PrismaService) {}
  async criarCliente(clienteDto: ClienteDto): Promise<ClienteModel> {
    if (!validaCpf(clienteDto.cpf))
      throw new UnprocessableEntityException('Cpf inválido');
    clienteDto.cpf = this.removeMascara(clienteDto.cpf);
    try {
      const cliente = await this.repo.clienteModel.create({ data: clienteDto });
      return cliente;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Cpf já cadastrado');
      } else throw error;
    }
  }

  async buscarClientePorCpf(cpf: string): Promise<ClienteModel> {
    if (!validaCpf(cpf)) throw new NotFoundException();
    cpf = this.removeMascara(cpf);
    const cliente = await this.repo.clienteModel.findUnique({ where: { cpf } });
    if (!cliente) throw new NotFoundException();
    return cliente;
  }

  async clientesComPaginacao(
    query: QueryClienteDto,
  ): Promise<ClienteResponseDto> {
    if (query.page) {
      const limit = query.limit ? query.limit : REGISTROS_POR_PAGINA;
      const [data, total] = await Promise.all([
        this.repo.clienteModel.findMany({
          skip: (query.page - 1) * limit,
          take: limit,
        }),
        this.repo.clienteModel.count({}),
      ]);
      const response = {
        data,
        currentPage: query.page,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      };
      return response;
    } else {
      const data = await this.repo.clienteModel.findMany({});
      return {
        data,
        currentPage: 1,
        itemsPerPage: data.length,
        totalPages: 1,
        totalItems: data.length,
      };
    }
  }

  removeMascara(cpf: string): string {
    return cpf.replace(/[\D]/g, '');
  }
}
