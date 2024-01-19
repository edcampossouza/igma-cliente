import { Body, Controller, Post } from '@nestjs/common';
import { Cliente } from 'src/models/cliente.model';

@Controller('clientes')
export class ClienteController {
  @Post()
  clientes(@Body() cli: Cliente): string {
    console.log(cli);
    return 'ok';
  }
}
