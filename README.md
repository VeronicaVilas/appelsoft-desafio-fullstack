# Introdução
O sistema oferece um ambiente abrangente e intuitivo para o gerenciamento de transações financeiras. Ele inclui funcionalidades de login e cadastro, além de permitir a listagem, edição e exclusão de transações, assim como a geração de resumos financeiros detalhados. Com foco na simplificação das operações diárias, o sistema possibilita o controle eficiente de entradas e saídas, apresentando um total consolidado. O objetivo é otimizar os processos de movimentações diárias, garantindo eficácia e praticidade na gestão financeira.

## Tecnologias e técnicas utilizadas

### Back-end

- **Framework/Linguagem:** Laravel v.10
- **Banco de Dados:** MySQL
- **Autenticação:** JWT

### Front-end

- **Framework/Linguagem:** Angular v.17
- **Biblioteca de estilo** Angular Material


## Configure o ambiente

### Back-end

Para garantir o correto funcionamento do back-end, execute os seguintes comandos:

1. Instale as dependências
```bash
cd backend
composer install
php artisan migrate
php artisan db:seed PopulatePlans
```

2. Criar um arquivo .env na raiz do projeto com os seguintes parametros:
`pode ser feito copiando o .env.example e alterando o nome para .env`

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

```
Configure utilizando seu bancos de dados

3. Popule o banco de dados:

```bash
php artisan migrate
php artisan db:seed PopulatePlans
```

4. Crie a chave de acesso JWT:

```bash
php artisan jwt:secret
```

### Front-end

Para garantir o correto funcionamento do front-end, retorne para a pasta raiz e execute os seguintes comandos:

```bash
cd .. #retornando para a raiz
cd frontend
npm install
```
## Acessando a aplicação

Para garantir o acesso à aplicação, siga os passos abaixo:

Front-end:

1. Execute o comando:

```bash
npm start
```

2. Acesse a aplicação no seguinte link: http://localhost:4200/

Back-end:

1. Execute o comando:

```bash
php artisan serve
```

2. Acesse a aplicação no seguinte link: http://localhost/

## Melhorias

- **Implementar testes unitários no back-end:** Desenvolver testes automatizados para verificar o comportamento de unidades de código no back-end, aumentando a confiabilidade e a robustez do sistema.
- **Implementar testes unitários no front-end:** Desenvolver testes automatizados para verificar o comportamento de unidades de código no front-end, garantindo o correto funcionamento da interface.
- **Otimizar consultas ao banco de dados:** Aprimorar a eficiência das consultas SQL.
- **Reforçar as validações de dados no back-end e front-end:** Fortalecer as validações de dados tanto no lado do servidor quanto no lado do cliente, garantindo uma maior integridade e consistência dos dados manipulados pela aplicação.
- **Aprimorar as respostas do back-end para incluir objetos estruturados de dados:** Melhorar as respostas do back-end para incluir objetos estruturados de dados em vez de mensagens simples, oferecendo mais informações e contexto aos clientes da API.
- **Aprimorar o roteamento backend e frontend:** Simplificar e organizar o gerenciamento de rotas, melhorando a estrutura e facilitando a adição de novas rotas para uma arquitetura mais robusta e escalável.

## Documentação da API

Esta documentação descreve os endpoints disponíveis para interagir com a API de gerenciamento.

Base URL: `http://localhost/`

## Endpoints


## Login

Retorna um token que concede acesso às funcionalidades disponíveis. Para acessar as demais aplicações, é necessário incluir esse token no corpo da requisição, no campo `auth > bearer`

- **Método:** POST
- **Endpoint:** `api/login`
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  [
    {
        "access_token": "O SEU TOKEN AQUI",
        "token_type": "bearer",
        "expires_in": 3600
    }
  ]
  ```

---

## Logout

Permiti sair do sistema utilizando o token

- **Método:** POST
- **Endpoint:** `api/logout`
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  {
    "message": "Saiu do sistema com sucesso!"
  }
  ```

---

## Transações

### Listar Transações

Retorna uma lista de todas as transações cadastradas.

- **Método:** GET
- **Endpoint:** `api/transacoes`
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  [
    {
        "id": 1,
        "transaction_type": "SAÍDA",
        "description": "Pagamento de serviços",
        "value": 100.00,
        "transaction_date": "2024-10-01"
    }
  ]
  ```

### Criar Transações

Cria uma nova transação.

- **Método:** POST
- **Endpoint:** `/api/transacoes`
- **Corpo da Requisição:**
  ```json
  {
    "transaction_type": "SAÍDA",
    "description": "Pagamento de serviços",
    "value": 100.00,
    "transaction_date": "2024-10-01"
  }
  ```
- **Resposta de Sucesso:** Status 201 Created
- **Exemplo de Resposta:**
  ```json
  {
        "id": 1,
        "transaction_type": "SAÍDA",
        "description": "Pagamento de serviços",
        "value": 100.00,
        "transaction_date": "2024-10-01"
  }
  ```

### Obter Cliente

Retorna os detalhes de uma transação específica com base no ID fornecido.

- **Método:** GET
- **Endpoint:** `/api/transacoes/{id}`
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  {
        "id": 1,
        "transaction_type": "SAÍDA",
        "description": "Pagamento de serviços",
        "value": 100.00,
        "transaction_date": "2024-10-01"
  }
  ```

### Atualizar Cliente

Atualiza os detalhes de uma transação já cadastrada.

- **Método:** PUT
- **Endpoint:** `/api/transacoes/{id}`
- **Corpo da Requisição:**
  ```json
  {
    "description": "Pagamento de contas",
  }
  ```
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  {
    "message": "Transação atualizada com sucesso!"
  }
  ```

### Excluir Cliente

Exclui uma transação existente pelo ID.

- **Método:** DELETE
- **Endpoint:** `/api/transacoes/{id}`
- **Resposta de Sucesso:** Status 204 No Content

---

### Obtem resumo financeiro

Retorna o total geral, além dos de entradas e saídas.

- **Método:** GET
- **Endpoint:** `/api/resumo`
- **Resposta de Sucesso:** Status 200 OK
- **Exemplo de Resposta:**
  ```json
  [
    {
        "Saldo total": "151.00",
        "Saldo total das entradas": "301.00",
        "Saldo total das saídas": "150.00"
    }
  ]
  ```
