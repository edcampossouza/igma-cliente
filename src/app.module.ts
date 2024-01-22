import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClienteModule } from './modules/cliente/cliente.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ClienteModule, PrismaModule],
  providers: [AppService],
})
export class AppModule {}
