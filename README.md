# Teste Igma - API Clientes

## Instalação e configuração

1. Instalação

   Execute `npm install` para instalar os pacotes necessários

2. Edite o arquivo `.env` com as informações:

   `DATABASE_NAME`: nome do banco de dados MySql

   `DATABASE_USER`: nome do usuário do banco de dados

   `DATABASE_PASSWORD`: senha de conexão com o banco de dados

   `DATABASE_PORT`: porta de acesso ao banco de dados (TCP)

   `DATABASE_HOST`: host (servidor) de banco de dados

3. Subir o banco de dados

   - Caso o sistema possua o docker instalado, executar `npm run db-dev-up`, para criar o container MySql automaticamente, sem necessidade de configuração extra

   - Caso contrário, crie uma instância de banco de dados MySql de acordo com os dados do arquivo `.env`

4. Inicialização do banco de dados

   Execute `npm run migrate:dev` para inicializar o esquema do banco de dados

## Execução

- execute `npm run start:dev` para subir a aplicação
- altere a porta com a variável de ambiente `APP_PORT` (padrao: 3500)

## Testes
  - execute `npm run test` para rodar os testes unitários

### Testes de integração
   - Edite o arquivo `.env.test` com os dados de acesso ao banco de testes
   - Caso o sistema possoa o Docker instalado, `npm run db-test-up`, para criar o container MySql de testes
   - Caso contrário, crie uma instância de banco de dados MySql de acordo com os dados do arquivo `.env.test` 
   - ```npm run test:e2e``` para rodar os testes de integração

## Rotas

- `POST /clientes`

  Cria um cliente

  Exemplo de requisição:

  `POST /clientes`

  body:

  ```json
  {
    "cpf": "11144477735",
    "nome": "cli 1.2",
    "dataDeNascimento": "2000-12-20"
  }
  ```

  Exemplo de resposta:

  ```json
  {
    "id": 8,
    "nome": "cli 1.2",
    "cpf": "11144477735",
    "dataDeNascimento": "2000-12-20T00:00:00.000Z"
  }
  ```

  Exemplo de resposta com erro:

  ```json
  {
    "message": ["Cpf inválido"],
    "error": "Unprocessable Entity",
    "statusCode": 422
  }
  ```

  Aceita `cpf` com (174.972.590-83) ou sem (17497259083) máscara

- `GET /clientes/:cpf`

  Obtém o cliente com o cpf especificado

  exemplo de requisição

  `GET /clientes/11144477735`

  exemplo de resposta

  ```json
  {
    "id": 15,
    "nome": "cli 1.2",
    "cpf": "11144477735",
    "dataDeNascimento": "2000-12-20T00:00:00.000Z"
  }
  ```

  exemplo de resposta (não encontrado)

  ```json
  {
    "message": "Not Found",
    "statusCode": 404
  }
  ```

- GET `/clientes`

  Obtém uma lista de clientes

  Query strings:

  - `page`: página a ser retornada (>=1)
  - `limite`: registros por página (padrão: 10)

  Exemplo de requisição

  `GET /clientes?limit=2&page=1`

  Exemplo de resposta

  ```json
  {
    "data": [
      {
        "id": 15,
        "nome": "cli 1.2",
        "cpf": "11144477735",
        "dataDeNascimento": "2000-12-20T00:00:00.000Z"
      },
      {
        "id": 17,
        "nome": "Eduardo",
        "cpf": "17497259083",
        "dataDeNascimento": "2000-01-21T00:00:00.000Z"
      }
    ],
    "currentPage": 1,
    "itemsPerPage": 2,
    "totalPages": 2,
    "totalItems": 3
  }
  ```

## Tecnologias utilizadas

- Node.js v20.10.0

  Ambiente de execução javascript

- Nest.js (baseado em Typescript)

  Framework web de aplicações server-side

- MySql

  Sistema de banco de dados relacional

- Prisma

  ORM para typescript/node.js

- Docker (opcional)

  Para iniciar o container MySql automaticamente a partir do arquivo `.env`
