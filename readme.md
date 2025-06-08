# Sistema de Gerenciamento de Tarefas - Tarefas+

Um sistema completo de gerenciamento de tarefas desenvolvido com Node.js, Express, PostgreSQL e EJS.

## 🚀 Funcionalidades

### ✅ Implementadas na Ponderada 3

- **Dashboard Interativo**: Visão geral com estatísticas e tarefas recentes
- **Gerenciamento de Tarefas**: CRUD completo com status, categorias e datas limite
- **Gerenciamento de Usuários**: Cadastro e edição de usuários do sistema
- **Gerenciamento de Categorias**: Organização de tarefas por categorias
- **Interface Responsiva**: Design moderno com CSS Grid e Flexbox
- **Integração Frontend-Backend**: Fetch API para comunicação assíncrona
- **Validações**: Validações no frontend e backend
- **Notificações**: Sistema de notificações para feedback do usuário

### 🎯 Arquitetura MVC

```
📁 Projeto/
├── 📁 config/          # Configurações (banco de dados)
├── 📁 controllers/     # Controladores (lógica de negócio)
├── 📁 models/          # Modelos (acesso aos dados)
├── 📁 routes/          # Rotas da aplicação
├── 📁 views/           # Views (EJS templates)
│   ├── 📁 components/  # Componentes reutilizáveis
│   ├── 📁 css/         # Estilos CSS
│   ├── 📁 js/          # JavaScript do frontend
│   ├── 📁 layout/      # Layout base
│   └── 📁 pages/       # Páginas da aplicação
├── 📁 scripts/         # Scripts de inicialização
└── 📁 tests/           # Testes unitários
```

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Banco de Dados**: PostgreSQL
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS**: Design System personalizado com variáveis CSS
- **Icons**: Font Awesome
- **Testes**: Jest + Supertest

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## ⚙️ Configuração e Instalação

### 1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd sistema-tarefas
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
Crie um arquivo `.env` na raiz do projeto:
```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=nome_do_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```

### 4. Execute o script de inicialização do banco
```bash
npm run init-db
```

### 5. Inicie o servidor
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

### 6. Acesse a aplicação
Abra o navegador em: `http://localhost:3333`

## 🎨 Interface do Sistema

### Dashboard
- **Estatísticas**: Total de tarefas, usuários, categorias e tarefas concluídas
- **Tarefas Recentes**: Lista das últimas tarefas criadas
- **Ações Rápidas**: Botões para acessar funcionalidades principais

### Gerenciamento de Tarefas
- **Lista Completa**: Visualização de todas as tarefas com filtros
- **Modal de Edição**: Formulário para criar/editar tarefas
- **Filtros**: Por status e categoria
- **Status**: Pendente, Em Progresso, Concluída

### Gerenciamento de Usuários
- **CRUD Completo**: Criar, listar, editar e excluir usuários
- **Validações**: Email único e campos obrigatórios

### Gerenciamento de Categorias
- **Organização**: Criação e edição de categorias
- **Proteção**: Não permite excluir categorias com tarefas associadas

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar servidor de produção
npm start

# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage

# Inicializar banco de dados
npm run init-db
```

## 📡 API Endpoints

### Tarefas
- `GET /api/tarefas` - Listar todas as tarefas
- `POST /api/tarefas` - Criar nova tarefa
- `PUT /api/tarefas/:id` - Atualizar tarefa
- `DELETE /api/tarefas/:id` - Excluir tarefa

### Usuários
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Criar usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Excluir usuário

### Categorias
- `GET /api/categorias` - Listar categorias
- `POST /api/categorias` - Criar categoria
- `PUT /api/categorias/:id` - Atualizar categoria
- `DELETE /api/categorias/:id` - Excluir categoria

## 🧪 Testes

O projeto inclui testes unitários para:
- Controllers
- Models
- Routes
- Services

Execute os testes com:
```bash
npm test
```

## 🎯 Requisitos da Ponderada 3 Implementados

### ✅ Passo 1 - Construção das Views
- [x] Páginas EJS organizadas na pasta `views/`
- [x] Views conectadas às rotas do Express
- [x] Dados vindos diretamente do banco via backend
- [x] Uso do `res.render()` para renderização

### ✅ Passo 2 - Integração Frontend-Backend via Fetch API
- [x] Interface interativa com botões funcionais
- [x] Comunicação via `fetch()` para operações CRUD
- [x] Rotas de API separadas (`/api/*`)
- [x] Tratamento de erros e feedback visual

### ✅ Passo 3 - Estilização com CSS
- [x] CSS moderno e responsivo
- [x] Sistema de design consistente
- [x] Uso de Flexbox e CSS Grid
- [x] Feedback visual para interações
- [x] Modais e animações

### ✅ Requisitos Mínimos
- [x] Views conectadas exibindo dados reais
- [x] Estilização CSS aplicada com layout organizado
- [x] Integração front-back com Fetch API
- [x] Estrutura MVC mantida
- [x] Código executável com `npm start`

## 🔄 Próximas Melhorias

- [ ] Sistema de autenticação
- [ ] Notificações em tempo real
- [ ] Relatórios e dashboards avançados
- [ ] API REST completa
- [ ] Testes de integração
- [ ] Deploy em produção

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso no Inteli - Instituto de Tecnologia e Liderança.

## 👥 Autor

**Henrique Rodrigues Diniz**
- LinkedIn: [henrique-rodrigues-diniz](https://www.linkedin.com/in/henrique-rodrigues-diniz-b7b011319/)

---

**Inteli - Instituto de Tecnologia e Liderança**