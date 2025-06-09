# WAD - Web Application Document
# Sistema Tarefas+ - Documentação Completa de Endpoints

# Henrique Rodrigues Diniz

## 📑 Índice
1. [Visão Geral](#visão-geral)
2. [Configuração Base](#🔧-configuração-base)
3. [Endpoints de API](#📋-endpoints-de-api)
   - [Tarefas](#tarefas-apitarefas)
   - [Usuários](#usuários-apiusuarios)
   - [Categorias](#categorias-apicategorias)
   - [Comentários](#comentários-apicomentarios)
4. [Rotas de Interface](#🌐-rotas-de-interface-frontend)
5. [Códigos de Status](#❌-códigos-de-status-http)
6. [Estrutura do Banco](#🔧-estrutura-do-banco-de-dados)
7. [Como Executar](#🚀-como-executar-o-sistema)
8. [Testando a API](#🧪-testando-a-api)
9. [Exemplos de Uso](#📝-exemplos-de-uso)
10. [Regras de Negócio](#🛡️-validações-e-regras-de-negócio)
11. [Melhorias Planejadas](#🔄-próximas-melhorias-planejadas)
12. [Características Técnicas](#🏗️-características-técnicas)

---

## Visão Geral
O sistema Tarefas+ possui uma arquitetura RESTful com endpoints para gerenciamento de tarefas, usuários, categorias e comentários. A aplicação segue o padrão MVC e oferece tanto endpoints de API quanto rotas para renderização de páginas.

---

## 🔧 Configuração Base
- **URL Base da API**: `/api`
- **Método de Autenticação**: Nenhum (sistema educacional)
- **Formato de Resposta**: JSON
- **Content-Type**: `application/json`

---

## 📋 Endpoints de API

### **Características Gerais dos Endpoints**
- Todos os endpoints retornam JSON
- Tratamento de erros padronizado com status HTTP apropriados
- Validações no servidor para dados obrigatórios
- Relacionamentos automáticos via JOINs para dados completos

### **TAREFAS** (`/api/tarefas`)

#### 1. Listar Todas as Tarefas
```http
GET /api/tarefas
```
**Descrição**: Retorna todas as tarefas cadastradas com informações de usuário e categoria.

**Resposta de Sucesso (200)**:
```json
[
  {
    "id": 1,
    "titulo": "Finalizar relatório mensal",
    "descricao": "Completar o relatório de vendas do mês",
    "usuario_id": 1,
    "usuario_nome": "João Silva",
    "categoria_id": 1,
    "categoria_nome": "Trabalho",
    "status": "em progresso",
    "data_criacao": "2024-01-15T10:30:00.000Z",
    "data_limite": "2024-01-18"
  }
]
```

#### 2. Obter Tarefa por ID
```http
GET /api/tarefas/:id
```
**Parâmetros**:
- `id` (number): ID da tarefa

**Resposta de Sucesso (200)**:
```json
{
  "id": 1,
  "titulo": "Finalizar relatório mensal",
  "descricao": "Completar o relatório de vendas do mês",
  "usuario_id": 1,
  "usuario_nome": "João Silva",
  "categoria_id": 1,
  "categoria_nome": "Trabalho",
  "status": "em progresso",
  "data_criacao": "2024-01-15T10:30:00.000Z",
  "data_limite": "2024-01-18"
}
```

**Resposta de Erro (404)**:
```json
{
  "message": "Tarefa não encontrada"
}
```

#### 3. Criar Nova Tarefa
```http
POST /api/tarefas
```
**Corpo da Requisição**:
```json
{
  "titulo": "Nova tarefa",
  "descricao": "Descrição da tarefa",
  "usuario_id": 1,
  "categoria_id": 2,
  "status": "pendente",
  "data_limite": "2024-01-25"
}
```

**Campos**:
- `titulo` (string, obrigatório): Título da tarefa
- `descricao` (string, opcional): Descrição detalhada
- `usuario_id` (number, obrigatório): ID do usuário responsável
- `categoria_id` (number, opcional): ID da categoria
- `status` (string, opcional): "pendente" | "em progresso" | "concluída" (padrão: "pendente")
- `data_limite` (date, opcional): Data limite para conclusão

**Resposta de Sucesso (201)**:
```json
{
  "id": 7,
  "titulo": "Nova tarefa",
  "descricao": "Descrição da tarefa",
  "usuario_id": 1,
  "categoria_id": 2,
  "status": "pendente",
  "data_criacao": "2024-01-15T14:30:00.000Z",
  "data_limite": "2024-01-25"
}
```

#### 4. Atualizar Tarefa
```http
PUT /api/tarefas/:id
```
**Corpo da Requisição**: (Mesma estrutura do POST, todos os campos opcionais)

#### 5. Excluir Tarefa
```http
DELETE /api/tarefas/:id
```
**Funcionalidade**: Remove a tarefa e TODOS os comentários associados automaticamente.

**Resposta de Sucesso (200)**:
```json
{
  "message": "Tarefa excluída com sucesso"
}
```

### **⚠️ Endpoints Implementados mas Não Roteados**
Os seguintes métodos existem no `TarefaController` mas não possuem rotas definidas:
- `marcarConcluida()` - Marca tarefa como concluída
- `desmarcarConcluida()` - Remove status de concluída  
- `listarTarefasConcluidas()` - Lista apenas tarefas concluídas
- `listarTarefasPendentes()` - Lista apenas tarefas pendentes

**Uso atual**: A funcionalidade é implementada via PUT geral atualizando o campo `status`.

---

### **USUÁRIOS** (`/api/usuarios`)

#### 1. Listar Todos os Usuários
```http
GET /api/usuarios
```
**Resposta de Sucesso (200)**:
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha_hash": "hash_placeholder",
    "data_criacao": "2024-01-10T08:00:00.000Z"
  }
]
```

#### 2. Obter Usuário por ID
```http
GET /api/usuarios/:id
```

#### 3. Criar Novo Usuário
```http
POST /api/usuarios
```
**Corpo da Requisição**:
```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com"
}
```

**Campos**:
- `nome` (string, obrigatório): Nome completo do usuário
- `email` (string, obrigatório): Email único do usuário

**Validações**:
- Email deve ser único no sistema
- Ambos os campos são obrigatórios

**Resposta de Erro - Email Duplicado (400)**:
```json
{
  "error": "Email já está em uso"
}
```

**Resposta de Erro - Campos Obrigatórios (400)**:
```json
{
  "error": "Nome e email são obrigatórios"
}
```

#### 4. Atualizar Usuário
```http
PUT /api/usuarios/:id
```

#### 5. Excluir Usuário
```http
DELETE /api/usuarios/:id
```

---

### **CATEGORIAS** (`/api/categorias`)

#### 1. Listar Todas as Categorias
```http
GET /api/categorias
```
**Resposta de Sucesso (200)**:
```json
[
  {
    "id": 1,
    "nome": "Trabalho"
  },
  {
    "id": 2,
    "nome": "Pessoal"
  }
]
```

#### 2. Obter Categoria por ID
```http
GET /api/categorias/:id
```

#### 3. Criar Nova Categoria
```http
POST /api/categorias
```
**Corpo da Requisição**:
```json
{
  "nome": "Estudos"
}
```

#### 4. Atualizar Categoria
```http
PUT /api/categorias/:id
```

#### 5. Excluir Categoria
```http
DELETE /api/categorias/:id
```
**Restrições**: 
- Não é possível excluir categorias que possuem tarefas associadas
- O model verifica automaticamente e retorna erro se houver tarefas vinculadas

**Resposta de Erro (400)**:
```json
{
  "error": "Não é possível excluir categoria com tarefas associadas"
}
```

---

### **COMENTÁRIOS** (`/api/comentarios`)

#### 1. Listar Todos os Comentários
```http
GET /api/comentarios
```
**Resposta de Sucesso (200)**:
```json
[
  {
    "id": 1,
    "tarefa_id": 1,
    "usuario_id": 1,
    "usuario_nome": "João Silva",
    "texto": "Preciso revisar os números da última semana",
    "data_criacao": "2024-01-15T15:30:00.000Z"
  }
]
```

#### 2. Obter Comentário por ID
```http
GET /api/comentarios/:id
```

#### 3. Criar Novo Comentário
```http
POST /api/comentarios
```
**Corpo da Requisição**:
```json
{
  "tarefa_id": 1,
  "usuario_id": 1,
  "texto": "Comentário sobre a tarefa"
}
```

#### 4. Atualizar Comentário
```http
PUT /api/comentarios/:id
```

#### 5. Excluir Comentário
```http
DELETE /api/comentarios/:id
```

---

## 🌐 Rotas de Interface (Frontend)

### **Arquitetura Frontend-Backend**
Todas as páginas EJS fazem requisições AJAX via `fetch()` para os endpoints da API. O fluxo é:
1. Servidor renderiza página EJS com layout básico
2. JavaScript no cliente carrega dados via API endpoints
3. Interface atualiza dinamicamente com os dados recebidos
4. Operações CRUD são feitas via fetch para `/api/*` endpoints

### **Páginas Principais**

#### 1. Dashboard Principal
```http
GET /
```
**Renderiza**: `pages/dashboard.ejs`
**Descrição**: Página inicial com estatísticas e tarefas recentes

#### 2. Gerenciamento de Tarefas
```http
GET /tarefas-page
```
**Renderiza**: `pages/tarefas.ejs`
**Descrição**: Interface para CRUD de tarefas com filtros

#### 3. Gerenciamento de Usuários
```http
GET /usuarios-page
```
**Renderiza**: `pages/usuarios.ejs`
**Descrição**: Interface para CRUD de usuários

#### 4. Gerenciamento de Categorias
```http
GET /categorias-page
```
**Renderiza**: `pages/categorias.ejs`
**Descrição**: Interface para CRUD de categorias

### **Recursos do Frontend**
- **Modais Dinâmicos**: Para criação/edição de recursos
- **Filtros em Tempo Real**: Na página de tarefas (por status e categoria)
- **Validações Client-Side**: Campos obrigatórios e formato de email
- **Notificações**: Sistema de feedback visual para operações
- **Responsividade**: Layout adaptável para dispositivos móveis
- **Tema Claro/Escuro**: Toggle de tema com persistência local

---

## ❌ Códigos de Status HTTP

| Código | Descrição | Quando Ocorre |
|--------|-----------|---------------|
| 200 | OK | Operação bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou campos obrigatórios ausentes |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

---

## 🔧 Estrutura do Banco de Dados

### Tabela `usuarios`
```sql
id SERIAL PRIMARY KEY
nome VARCHAR(100) NOT NULL
email VARCHAR(100) UNIQUE NOT NULL
senha_hash TEXT NOT NULL
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Tabela `categorias`
```sql
id SERIAL PRIMARY KEY
nome VARCHAR(50) NOT NULL
```

### Tabela `tarefas`
```sql
id SERIAL PRIMARY KEY
usuario_id INT NOT NULL (FK)
titulo VARCHAR(255) NOT NULL
descricao TEXT
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
data_limite DATE
status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em progresso', 'concluída'))
categoria_id INT (FK)
```

### Tabela `comentarios`
```sql
id SERIAL PRIMARY KEY
tarefa_id INT NOT NULL (FK)
usuario_id INT NOT NULL (FK)
texto TEXT NOT NULL
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## 🚀 Como Executar o Sistema

### **Pré-requisitos**
- Node.js (v16+)
- PostgreSQL (v12+)
- npm ou yarn

### **Configuração**
1. Clone o repositório
2. Instale dependências: `npm install`
3. Configure arquivo `.env`:
```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=nome_do_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```
4. Inicialize o banco: `npm run init-db`
5. Execute: `npm run dev` (desenvolvimento) ou `npm start` (produção)

### **URLs de Acesso**
- **Frontend**: http://localhost:3000
- **API Base**: http://localhost:3000/api

---

## 🧪 Testando a API

### **Ferramentas Recomendadas**
- **Postman**: Para testes interativos
- **curl**: Para testes via linha de comando
- **REST Client**: Extension do VS Code (arquivo `rest.http` incluído)

### **Arquivo rest.http Incluído**
O projeto inclui um arquivo `rest.http` com exemplos de requisições prontas para teste.

### Fluxo Básico: Criar uma Tarefa Completa

1. **Criar usuário**:
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Pedro Santos", "email": "pedro@email.com"}'
```

2. **Criar categoria**:
```bash
curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -d '{"nome": "Desenvolvimento"}'
```

3. **Criar tarefa**:
```bash
curl -X POST http://localhost:3000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Implementar API",
    "descricao": "Desenvolver endpoints REST",
    "usuario_id": 1,
    "categoria_id": 1,
    "status": "em progresso",
    "data_limite": "2024-01-30"
  }'
```

4. **Adicionar comentário**:
```bash
curl -X POST http://localhost:3000/api/comentarios \
  -H "Content-Type: application/json" \
  -d '{
    "tarefa_id": 1,
    "usuario_id": 1,
    "texto": "Iniciando desenvolvimento da API"
  }'
```

---

## 🛡️ Validações e Regras de Negócio

### Tarefas
- `titulo` é obrigatório
- `usuario_id` deve existir na tabela de usuários
- `status` deve ser um dos valores válidos
- Ao excluir uma tarefa, todos os comentários associados são removidos

### Usuários
- `email` deve ser único
- `nome` e `email` são obrigatórios
- Validação de formato de email no frontend

### Categorias
- `nome` é obrigatório
- Não é possível excluir categorias com tarefas associadas

### Comentários
- `tarefa_id` e `usuario_id` devem existir
- `texto` é obrigatório

---

## 🔄 Próximas Melhorias Planejadas

- [ ] Autenticação e autorização
- [ ] Paginação nos endpoints de listagem
- [ ] Filtros avançados na API
- [ ] WebSockets para atualizações em tempo real
- [ ] Upload de arquivos anexos às tarefas
- [ ] API de relatórios e estatísticas
- [ ] Logs de auditoria

---

## 🏗️ Características Técnicas

### **Arquitetura**
- **Pattern**: MVC (Model-View-Controller)
- **Database**: PostgreSQL com pool de conexões
- **Template Engine**: EJS
- **CSS Framework**: Sistema personalizado com variáveis CSS
- **Frontend**: Vanilla JavaScript ES6+ com Fetch API

### **Performance e Segurança**
- **Conexões de DB**: Pool de conexões PostgreSQL
- **SQL Injection**: Prevenção via prepared statements
- **CORS**: Habilitado para desenvolvimento
- **Error Handling**: Tratamento centralizado de erros
- **Logging**: Console logs para desenvolvimento

### **Estrutura de Arquivos**
```
📁 Projeto/
├── 📁 config/          # Configuração do banco
├── 📁 controllers/     # Lógica de negócio
├── 📁 models/          # Camada de dados
├── 📁 routes/          # Definição de rotas
├── 📁 views/           # Templates EJS
├── 📁 public/          # Arquivos estáticos
├── 📁 scripts/         # Scripts de inicialização
└── 📁 tests/           # Testes unitários
```

### **Scripts NPM Disponíveis**
```bash
npm start              # Produção
npm run dev            # Desenvolvimento (nodemon)
npm test               # Testes unitários
npm run test:coverage  # Coverage dos testes
npm run init-db        # Inicializar banco
npm run reset-db       # Reset completo do banco
```
