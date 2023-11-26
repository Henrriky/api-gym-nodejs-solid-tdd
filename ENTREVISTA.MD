# Aplicação

- GymPass Style App

## RFs (Requisitos funcionais)

### Definição

- Representa as funcionalidades, o que o usuário vai poder fazer dentro da aplicação

### Requisitos funcionais da nossa aplicação

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-ins em uma academia; 
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

### Definição 

- Regras de negócio são as regras que determinam em qual condição ou como determinado funcionalidade pode ser aplicada.
- Que condições são aplicadas para cada funcionalidade.
- Sempre está associada aos requisitos funcionais.

### Regras de negócio da nossa aplicação

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

### Definição

- Requisitos que não partem do nosso cliente necessariamente, são definidas pelos desenvolvedores, pois na maioria das vezes são técnicos. Além disso, os requisitos não funcionais muita das vezes estão implicitos, e cabe ao analista levar em conta esses requisitos no desenvolvimento da aplicação.
- Exemplo: Framework, banco de dados, cache (desempenho), paginação (desempenho).

### Requisitos não-funcionais da nossa aplicação

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreeSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);