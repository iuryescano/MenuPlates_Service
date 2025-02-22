# Documentação das Rotas da API

## Rotas de Ingredientes

### Listar Ingredientes
- **Rota:** `GET /:user_id`
- **Descrição:** Retorna a lista de ingredientes do usuário especificado.
- **Parâmetros:**
  - `user_id` (obrigatório): ID do usuário.
- **Resposta:** JSON contendo a lista de ingredientes.

## Rotas de Pratos

### Listar Pratos
- **Rota:** `GET /`
- **Descrição:** Retorna a lista de todos os pratos.
- **Resposta:** JSON contendo a lista de pratos.

### Criar Prato
- **Rota:** `POST /:user_id`
- **Descrição:** Cria um novo prato. Requer autenticação e autorização de administrador.
- **Parâmetros:**
  - `user_id` (obrigatório): ID do usuário.
- **Corpo da Requisição:** JSON contendo os dados do prato.
- **Resposta:** JSON contendo os dados do prato criado.

### Visualizar Prato
- **Rota:** `GET /:id`
- **Descrição:** Retorna os dados de um prato específico.
- **Parâmetros:**
  - `id` (obrigatório): ID do prato.
- **Resposta:** JSON contendo os dados do prato.

### Deletar Prato
- **Rota:** `DELETE /:id`
- **Descrição:** Deleta um prato específico. Requer autenticação e autorização de administrador.
- **Parâmetros:**
  - `id` (obrigatório): ID do prato.
- **Resposta:** Mensagem de sucesso ou erro.

### Atualizar Prato
- **Rota:** `PUT /:id`
- **Descrição:** Atualiza os dados de um prato específico. Requer autenticação e autorização de administrador.
- **Parâmetros:**
  - `id` (obrigatório): ID do prato.
- **Corpo da Requisição:** JSON contendo os dados atualizados do prato.
- **Resposta:** JSON contendo os dados do prato atualizado.

### Atualizar Imagem do Prato
- **Rota:** `PATCH /image`
- **Descrição:** Atualiza a imagem de um prato. Requer autenticação.
- **Corpo da Requisição:** FormData contendo a imagem do prato.
- **Resposta:** JSON contendo os dados do prato atualizado.

## Rotas de Sessões

### Criar Sessão
- **Rota:** `POST /`
- **Descrição:** Cria uma nova sessão de usuário (login).
- **Corpo da Requisição:** JSON contendo as credenciais do usuário.
- **Resposta:** JSON contendo os dados da sessão e token de autenticação.

## Rotas de Usuários

### Criar Usuário
- **Rota:** `POST /`
- **Descrição:** Cria um novo usuário.
- **Corpo da Requisição:** JSON contendo os dados do usuário.
- **Resposta:** JSON contendo os dados do usuário criado.

### Atualizar Usuário
- **Rota:** `PUT /`
- **Descrição:** Atualiza os dados do usuário autenticado.
- **Corpo da Requisição:** JSON contendo os dados atualizados do usuário.
- **Resposta:** JSON contendo os dados do usuário atualizado.
