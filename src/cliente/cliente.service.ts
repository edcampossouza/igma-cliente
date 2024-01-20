import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validaCpf } from 'src/util/cpf.validator';
import { ClienteModel } from "@prisma/client"

@Injectable()
export class ClienteService {
  constructor(private db: PrismaService) { }
  async criarCliente(clienteDto: ClienteDto): Promise<ClienteModel> {
    if (!validaCpf(clienteDto.cpf)) throw new UnprocessableEntityException("Cpf inválido")
    const cliente = await this.db.clienteModel.create({ data: clienteDto })
    return cliente
  }

  async buscarClientePorCpf(cpf: string): Promise<ClienteModel> {
    const cliente = await this.db.clienteModel.findFirst({ where: { cpf } })
    if (!cliente) throw new NotFoundException()
    return cliente
  }
  
  async clientes(): Promise<ClienteModel[]> {
    return []
  }

}
