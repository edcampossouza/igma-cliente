# Teste Igma - API Clientes

## Instalação e configuração

1. Instalação

   Execute `npm install` para instalar os pacotes necessários

2. edite o arquivo `.env` com as informações:

   `DATABASE_NAME`: nome do banco de dados MySql

   `DATABASE_USER`: nome do usuário do banco de dados

   `DATABASE_PASSWORD`: senha de conexão com o banco de dados

   `DATABASE_PORT`: porta de acesso ao banco de dados (TCP)

   `DATABASE_HOST`: host (servidor) de banco de dados

3. Subir o banco de dados

   - Caso o sistema possua o docker instalado, executar `npm run db-dev-up`, para criar o container MySql automaticamente, sem necessidade de configuração extra

   - Caso contrário, crie uma instância de banco de dados MySql de acordo com os dados do arquivo `.env`

4. Inicialização do banco de dados

   Execute `npm run migrate:deploy` para inicializar o esquema do banco de dados

## Execução

- execute `npm run start:dev` para subir a aplicação

## Rotas

- `POST /clientes`

  Exemplo de requisição:

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

  Aceita ```cpf``` com (174.972.590-83) ou sem (17497259083) máscara

## Tecnologias utilizadas

- Nest.js (baseado em Typescript)

  Framework web de aplicações server-side

- MySql

  Sistema de banco de dados relacional

- Prisma

  ORM para typescript/node.js

- Docker (opcional)

  Para iniciar o container MySql automaticamente a partir do arquivo `.env`

- Node.js v20.10.0
  Ambiente de execução javascript
