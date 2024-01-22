import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockClientes, mockCliente } from './mock-data/clientes.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ClienteModel } from '@prisma/client';

describe('ClienteService', () => {
  let service: ClienteService;
  let db: ClienteModel[] = [...mockClientes];

  const mockPrisma = {
    clienteModel: {
      findUnique: async ({ where: { cpf } }) => db.find((c) => c.cpf === cpf),
      findMany: async ({ skip, take }: { skip: number; take: number }) => {
        if (skip) {
          return db.slice(skip, skip + take);
        } else {
          return db;
        }
      },
      count: () => {
        return db.length;
      },
      create: async (argument: { data: ClienteDto }) => {
        const { data } = argument;
        const conflict = db.find((c) => c.cpf === data.cpf);
        if (conflict) {
          throw new PrismaClientKnownRequestError('conflito', {
            code: 'P2002',
            clientVersion: '',
          });
        } else {
          const maxId = db.reduce((p, c) => Math.max(p, c.id), 1);
          db.push({ ...data, id: maxId + 1 });
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
    db = [...mockClientes];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('busca por cpf corretamente', () => {
    const cliente = mockClientes[0];
    expect(service.buscarClientePorCpf(cliente.cpf)).resolves.toBe(cliente);
  });

  it('busca por cpf corretamente (com mascara)', () => {
    const cliente = mockClientes[0];
    expect(service.buscarClientePorCpf(mascaraCpf(cliente.cpf))).resolves.toBe(
      cliente,
    );
  });

  it('NotFoundException (cpf com mascara incorreta)', () => {
    const cliente = mockClientes[0];
    const cpf = cliente.cpf;
    const chave = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 11)}`;
    expect(service.buscarClientePorCpf(chave)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('Deve criar o cliente corretamente', () => {
    const cli: ClienteDto = mockCliente;
    expect(service.criarCliente(cli)).resolves;
    const cliCriado = service.buscarClientePorCpf(cli.cpf);
    expect(cliCriado).resolves.toMatchObject({
      cpf: cli.cpf,
      id: mockClientes.length + 1,
    });
  });

  it('ConflictException (cpf com duplicidade)', () => {
    const cli = { ...mockClientes[0] };
    delete cli.id;
    expect(service.criarCliente(cli)).rejects.toBeInstanceOf(ConflictException);
  });

  it('Retorno sem paginacao', () => {
    const response = service.clientesComPaginacao({});
    expect(response).resolves.toMatchObject({
      data: db,
      currentPage: 1,
      itemsPerPage: db.length,
      totalPages: 1,
      totalItems: db.length,
    });
  });
  it('Retorno com paginacao', () => {
    expect(db.length >= 2);
    const page = 2;
    const limit = 2;
    const expectedData = [db[2], db[3]];
    const response = service.clientesComPaginacao({ page, limit });
    expect(response).resolves.toMatchObject({
      data: expect.arrayContaining(expectedData),
      currentPage: 2,
      itemsPerPage: 2,
      totalItems: db.length,
    });
  });
});

function mascaraCpf(cpf: string): string {
  return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
}
