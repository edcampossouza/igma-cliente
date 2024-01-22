import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';
import { QueryClienteDto } from './dto/query-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Post()
  createCliente(@Body() clienteDto: ClienteDto) {
    return this.clienteService.criarCliente(clienteDto);
  }

  @Get(':cpf')
  buscarClientePorCpf(@Param('cpf') cpf: string) {
    return this.clienteService.clientePorCpf(cpf);
  }

  @Get()
  buscarClientes(@Query() query: QueryClienteDto) {
    return this.clienteService.clientesComPaginacao(query);
  }
}
