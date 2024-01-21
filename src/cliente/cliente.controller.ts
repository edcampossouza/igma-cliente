import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';
import { CpfPipe } from 'src/pipes/cpf-transform.pipe';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) { }
  @Post()
  createCliente(@Body() clienteDto: ClienteDto) {
    return this.clienteService.criarCliente(clienteDto);
  }

  @Get(':cpf')
  buscarClientePorCpf(@Param('cpf') cpf: string) {
    return this.clienteService.buscarClientePorCpf(cpf)
  }

  @Get()
  buscarClientes() { }
}
