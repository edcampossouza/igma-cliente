import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ClienteModule, PrismaModule],
  providers: [AppService],
})
export class AppModule {}
