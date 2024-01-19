import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [ClienteModule],
  providers: [AppService],
})
export class AppModule {}
