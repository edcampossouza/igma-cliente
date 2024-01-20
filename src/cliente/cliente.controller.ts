import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) { }
  @Post()
  createCliente(@Body() cli: ClienteDto) {
    return this.clienteService.createCliente(cli);
  }

  @Get()
  buscarClientes() { }
}
