![Logo](https://github.com/FelipeDecome/ventura-academy-test/blob/master/src/assets/images/Logo.svg)

### Projeto desenvolvido como teste para Ventura Academy. 

# Instalar e testar

### [Repositório do front-end](https://github.com/FelipeDecome/ventura-academy-test)

```console
npm install
npm run build
npm run knex:build:migrate
npm start
```
# Funcionalidade Requisitada

Criar aplicação web que receba um e-mail, exiba um vídeo para o usuário e grave em uma
base as ações do usuário no vídeo juntamente com seu e-mail.

# Requisitos Técnicos do Backend

- [x] Usar Node.js.
- [x] Para cada ação do usuário realizada no front-end salvar na base de dados.

# API
**https://backend-ventura-academy.herokuapp.com/**

### Rotas da api

##### - Rota **POST** `/actions`:
*Cria uma nova ação no banco de dados no email informado.*

Recebe no body um JSON com 2 parâmetros
```javascript
{
    email: 'string',
    actionName: 'string', // 'start' || 'pause'
}
```

##### - Rota **GET** `/actions`:
*Retorna uma busca no banco de dados com um email específico.*

Recebe 1 parâmetro na URL
`/actions?email=email@email.com`


##### - Rota **GET** `/actions/all`:
*Retorna todos as ações registradas no banco de dados separadas por email.*

Não recebe nenhum parâmetro

