import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockClientes, mockCliente } from './mock-data/clientes.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('ClienteService', () => {
  let service: ClienteService;

  const mockPrisma = {
    clienteModel: {
      findUnique: async ({ where: { cpf } }) =>
        mockClientes.find((c) => c.cpf === cpf),
      create: async (argument: { data: ClienteDto }) => {
        const { data } = argument;
        const conflict = mockClientes.find((c) => c.cpf === data.cpf);
        console.log('>>', data, conflict);
        if (conflict) {
          throw new PrismaClientKnownRequestError('conflito', {
            code: 'P2002',
            clientVersion: '',
          });
        } else {
          const maxId = mockClientes.reduce((p, c) => Math.max(p, c.id), 1);
          mockClientes.push({ ...data, id: maxId + 1 });
        }
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('busca por cpf corretamente', () => {
    const cliente = mockClientes[0];
    expect(service.clientePorCpf(cliente.cpf)).resolves.toBe(cliente);
  });

  it('busca por cpf corretamente (com mascara)', () => {
    const cliente = mockClientes[0];
    expect(service.clientePorCpf(mascaraCpf(cliente.cpf))).resolves.toBe(
      cliente,
    );
  });

  it('NotFoundException (cpf com mascara incorreta)', () => {
    const cliente = mockClientes[0];
    const cpf = cliente.cpf;
    const chave = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 11)}`;
    expect(service.clientePorCpf(chave)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('Deve criar o cliente corretamente', () => {
    const cli: ClienteDto = mockCliente;
    expect(service.criarCliente(cli)).resolves;
    const cliCriado = service.clientePorCpf(cli.cpf);
    expect(cliCriado).resolves.toMatchObject({
      cpf: cli.cpf,
      id: mockClientes.length,
    });
  });

  it('ConflictException (cpf com duplicidade)', () => {
    const cli = { ...mockClientes[0] };
    delete cli.id;
    expect(service.criarCliente(cli)).rejects.toBeInstanceOf(ConflictException);
  });
});

function mascaraCpf(cpf: string): string {
  return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
}
