import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockClientes } from './mock-data/clientes.mock';
import { NotFoundException } from '@nestjs/common';

describe('ClienteService', () => {
  let service: ClienteService;
  let prisma: PrismaService;

  const mockPrisma = {
    clienteModel: { findFirst: async ({ where: { cpf } }) => mockClientes.find(c => c.cpf === cpf) },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<ClienteService>(ClienteService);
    prisma = module.get<PrismaService>(PrismaService);


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('busca por cpf corretamente', () => {
    const cliente = mockClientes[0];
    expect(service.buscarClientePorCpf(cliente.cpf)).resolves.toBe(cliente)
  })

  it('busca por cpf corretamente (com mascara)', () => {
    const cliente = mockClientes[0];
    expect(service.buscarClientePorCpf(mascaraCpf(cliente.cpf))).resolves.toBe(cliente)
  })

  it('NotFoundException (cpf com mascara incorreta)', () => {
    const cliente = mockClientes[0];
    const cpf = cliente.cpf;
    const chave = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 11)}`
    expect(service.buscarClientePorCpf(chave)).rejects.toBeInstanceOf(NotFoundException)
  })

});

function mascaraCpf(cpf: string): string {
  return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`
}