# Estrutura

## Configurações iniciais

- `npm i typescript @types/node tsx tsup -D`
- tsup: Serve para quando for criar a versão de build da aplicação  
- `npx tsc --init`
- `npm i fastify`
```json
  "scripts": {
    "start:dev": "tsx watch src/server.ts", // SCRIPT PARA EXECUTAR DE FORMA LOCAL
    "start": "node build/server.js", // SCRIPT PARA EXECUTAR EM PRODUÇÃO
    "build": "tsup src --out-dir build", // SCRIPT COMPILAR O PROJETO PARA JS/PRODUÇÃO
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Usando versões exatas do NPM

- Criar arquivo  `.npmrc`
- Quando executar um `npm install` a versão da dependência que vai ficar em package.json vai ficar fixa
```
save-exact=true
```
- Bot renovate: tenta atualizar as dependencias executando os testes da aplicação para ver se ela não quebra.
- Caso não tenha erros nos testes ele cria uma pull request falando que podemos atualizar nossas dependencias.

## Variaveis de ambiente

- `npm i dotenv`
- `npm i zod`

## ESLint

- `npm i eslint @rocketseat/eslint-config -D`
```
{
  "extends": [
    "@rocketseat/eslint-config/node"
  ]
}
```

## Configurando import absoluto

```json
    {
      "baseUrl": "./",
      "paths": {
        "@/*": ["./src/*"]
      },   
    }  
```

# Fundamentos do prisma

- Baixo nível db famosos: node-postgrees e knex.js.
- ORM: prisma.io, typeorm e sequelize
- Dependencias de desenvolvimento
  - `npm i prisma -D` -> CLI do Prisma
  - `npx prisma init` -> NPX shorthand para acessar arquivos dentro de .bin
  - `npx prisma generate` -> Gera as tipagens em @prisma/client/index.d.ts
  - `npx prisma migrate dev` -> Gera os controles de versão do nosso banco.
  - `npx prisma studio`
  - `npx prisma deploy` -> Não compara, apenas pega todas as migrations geradas e roda elas no banco de dados.
- Dependencias de produção
  - `npm i @prisma/client`
- Caso estivessemos criando uma coluna e já existissem dados no banco nós poderiamos definir a coluna como opcional ou definir o valor como branco

# Fundamentos do docker

- Reaproveita o ambiente onde criamos a nossa virtualização e possui apenas o serviço, apenas a aplicação.

## Postgree com Docker

- DockerHub é um repositório de imagens do docker
  - Imagens são receitas, ou seja, scripts pré-configurados para executarem aplicações comuns como Postgrees, Nodejs, Redis, Nginx, MySQL, MariaDB etc.
- Podem existir diversas imagens de um mesmo serviço, no nosso caso temos a imagem oficial do Postgrees mas vamos usar a da Bitnami, que é bem voltada para a parte de segurança:
  - `docker run --name api-solid-pg bitnami/postgresql:latest` 
    - postgresql: nome da imagem
    - bitnami: empresa que mantém a imagem
    - postgresql: serviço/aplicação
    - lastest: versão
- No nosso caso vamos personalizar nossa imagem:
  - `docker run --name postgresql -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest`
    - 5432:5432 -> Esquerda (Porta do sistema) Direita (Porta do Docker)
- Após executar o comando nosso Postgree ja vai estar disponivel na porta 5432. Além disso, caso a gente de um `CTRL + C` vamos para de executar o container, mas o docker mantém o container/versão do Postgrees em cache, para evitar demora na hora de iniciar nosso serviço.
- Comandos:
  - `docker ps`: Mostra containers em execução
  - `docker ps -a`: Todos os containers criados em algum momento 
  - `docker start id`
  - `docker start api-solid-pg`: Inicia um container
  - `docker stop api-solid-pg`: Para a execução do container
  - `docker rm api-solid-pg`: Remove a imagem do docker.
  - `docker logs api-solid-ignite-db -f`: Mostra os logs dos containers

## Docker compose

- docker-compose.yaml: Arquivo que dita quais são todos os containers que a aplicação precisa criar para que uma aplicação funcione.
```yaml
version: '3'

services:
  api-solid-pg:
    image: bitnami/postgresql:latest
    ports: 
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```
- `docker compose up -d`
  - d: background
- `docker compose stop`: Finaliza os containers da aplicaçã
- `docker compose down`: Deleta os containers da aplicação 
- `docker-compose restart`