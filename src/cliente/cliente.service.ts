import { Injectable } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { ClienteModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private db: PrismaService) { }
  async createCliente(cli: ClienteDto) {
    await this.db.clienteModel.create({ data: cli })
  }
  getClientes() { }

}
