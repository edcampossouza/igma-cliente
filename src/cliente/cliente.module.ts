import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  imports: [PrismaModule]
})
export class ClienteModule {}
