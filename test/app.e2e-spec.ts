import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { resetDatabase } from './util';
import { mockClientes } from '../src/modules/cliente/mock-data/clientes.mock';

describe('Clientes (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  afterAll(async () => {
    await resetDatabase(prisma);
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await resetDatabase(prisma);

    await app.init();
  });

  it('/ (rota não existente)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/clientes (GET) ', () => {
    return request(app.getHttpServer()).get('/clientes').expect(200).expect({
      data: [],
      currentPage: 1,
      itemsPerPage: 0,
      totalPages: 1,
      totalItems: 0,
    });
  });

  it('/clientes (POST)', () => {
    return request(app.getHttpServer())
      .post('/clientes')
      .send(mockClientes[0])
      .expect(201)
      .expect((res) =>
        expect(res.body).toMatchObject({
          nome: mockClientes[0].nome,
          cpf: mockClientes[0].cpf,
        }),
      );
  });
});
