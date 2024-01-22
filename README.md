# Teste Igma - API Clientes
## Instalação e configuração
 - Instalação
    
    Execute ```npm install``` para instalar os pacotes necessários
- edite o arquivo ```.env``` com as informações:

    ```DATABASE_NAME```:  nome do banco de dados MySql

    ```DATABASE_USER```: nome do usuário do banco de dados

    ```DATABASE_PASSWORD```: senha de conexão com o banco de dados

    ```DATABASE_PORT```: porta de acesso ao banco de dados (TCP)

    ```DATABASE_HOST```: host (servidor) de banco de dados

- Execução do banco de dados

     - Caso o sistema possua o docker instalado, executar ```docker compose -up```, para criar o container MySql automaticamente, sem necessidade de configuração extra

     - Caso contrário, crie uma instância de banco de dados MySql de acordo com os dados do arquivo ```.env```
- Inicialização do banco de dados
    
    Execute ```npm run migrate:deploy``` para inicializar o esquema do banco de dados

## Execução
 - execute ```npm run start:dev``` para iniciar a aplicação


## Tecnologias utilizadas
 - Nest.js (baseado em Typescript)

    Framework web de aplicações server-side 

- MySql
    
    Sistema de banco de dados relacional

- Prisma
    
    ORM para typescript/node.js

- Docker (opcional)

    Para iniciar o container MySql automaticamente a partir do arquivo ```.env```

- Node.js v20.10.0
    
    Ambiente de execução javascript
