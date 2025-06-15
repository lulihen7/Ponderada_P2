# Diagrama de Arquitetura MVC - Sistema Tarefas+

## Visão Geral da Arquitetura

O sistema Tarefas+ segue o padrão arquitetural MVC (Model-View-Controller), proporcionando uma separação clara de responsabilidades e facilitando a manutenção e escalabilidade do código.

## Diagrama de Arquitetura

```mermaid
graph TD
    %% Cliente/Navegador
    User[👤 Usuário/Cliente<br/>Navegador Web]
    
    %% Servidor Principal
    subgraph "🖥️ Servidor Node.js + Express"
        Server[server.js<br/>Servidor Principal]
        
        %% Camada de Roteamento
        subgraph "🛣️ Rotas (Routes)"
            MainRoutes[index.js<br/>Rotas Principais]
            APIRoutes[fRoutes.js<br/>Rotas da API]
        end
        
        %% Camada Controller
        subgraph "🎮 Controllers"
            UserController[UsuarioController.js<br/>Lógica de Usuários]
            TaskController[TarefaController.js<br/>Lógica de Tarefas]
            CategoryController[CategoriaController.js<br/>Lógica de Categorias]
            CommentController[ComentarioController.js<br/>Lógica de Comentários]
        end
        
        %% Camada Model
        subgraph "📊 Models"
            UserModel[UsuarioModel.js<br/>Manipulação de Dados]
            TaskModel[TarefaModel.js<br/>Manipulação de Dados]
            CategoryModel[CategoriaModel.js<br/>Manipulação de Dados]
            CommentModel[ComentarioModel.js<br/>Manipulação de Dados]
        end
        
        %% Configuração
        DBConfig[database.js<br/>Configuração DB]
    end
    
    %% Camada View
    subgraph "🎨 Views (Frontend)"
        subgraph "📄 Pages"
            Dashboard[dashboard.ejs<br/>Página Principal]
            Tasks[tarefas.ejs<br/>Gerenciar Tarefas]
            Users[usuarios.ejs<br/>Gerenciar Usuários]
            Categories[categorias.ejs<br/>Gerenciar Categorias]
        end
        
        subgraph "🧩 Components"
            Header[header.ejs<br/>Cabeçalho]
            Navbar[navbar.ejs<br/>Navegação]
            Footer[footer.ejs<br/>Rodapé]
        end
        
        subgraph "🎯 Layout"
            MainLayout[main.ejs<br/>Layout Principal]
        end
        
        subgraph "💎 Assets"
            CSS[style.css<br/>Estilos]
            JS[main.js<br/>JavaScript]
        end
    end
    
    %% Banco de Dados
    subgraph "🗄️ Banco de Dados PostgreSQL"
        subgraph "📋 Tabelas"
            UsersTable[(usuarios)<br/>id, nome, email, senha_hash]
            TasksTable[(tarefas)<br/>id, titulo, descricao, usuario_id, categoria_id]
            CategoriesTable[(categorias)<br/>id, nome]
            CommentsTable[(comentarios)<br/>id, tarefa_id, usuario_id, texto]
        end
    end
    
    %% Fluxo de Dados - Requisições
    User -->|HTTP Request| Server
    Server --> MainRoutes
    MainRoutes --> APIRoutes
    
    %% Controllers processam requisições
    APIRoutes --> UserController
    APIRoutes --> TaskController
    APIRoutes --> CategoryController
    APIRoutes --> CommentController
    
    %% Controllers interagem com Models
    UserController --> UserModel
    TaskController --> TaskModel
    CategoryController --> CategoryModel
    CommentController --> CommentModel
    
    %% Models acessam o banco
    UserModel --> DBConfig
    TaskModel --> DBConfig
    CategoryModel --> DBConfig
    CommentModel --> DBConfig
    
    DBConfig --> UsersTable
    DBConfig --> TasksTable
    DBConfig --> CategoriesTable
    DBConfig --> CommentsTable
    
    %% Relacionamentos entre tabelas
    TasksTable -.->|FK usuario_id| UsersTable
    TasksTable -.->|FK categoria_id| CategoriesTable
    CommentsTable -.->|FK tarefa_id| TasksTable
    CommentsTable -.->|FK usuario_id| UsersTable
    
    %% Controllers retornam para Views
    UserController --> Users
    TaskController --> Tasks
    CategoryController --> Categories
    Server --> Dashboard
    
    %% Views utilizam components e layout
    Dashboard --> MainLayout
    Tasks --> MainLayout
    Users --> MainLayout
    Categories --> MainLayout
    
    MainLayout --> Header
    MainLayout --> Navbar
    MainLayout --> Footer
    
    %% Assets são servidos
    MainLayout --> CSS
    MainLayout --> JS
    
    %% Resposta para o usuário
    Dashboard -->|HTML Response| User
    Tasks -->|HTML Response| User
    Users -->|HTML Response| User
    Categories -->|HTML Response| User
    
    %% API Responses
    UserController -->|JSON Response| User
    TaskController -->|JSON Response| User
    CategoryController -->|JSON Response| User
    CommentController -->|JSON Response| User
    
    %% Estilos do diagrama
    classDef controller fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef model fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef view fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef database fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef routes fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    
    class UserController,TaskController,CategoryController,CommentController controller
    class UserModel,TaskModel,CategoryModel,CommentModel model
    class Dashboard,Tasks,Users,Categories,Header,Navbar,Footer,MainLayout,CSS,JS view
    class UsersTable,TasksTable,CategoriesTable,CommentsTable,DBConfig database
    class MainRoutes,APIRoutes routes
```

## Descrição dos Componentes

### 🎮 **Controllers (Controladores)**
- **Responsabilidade**: Gerenciar a lógica de negócios e coordenar entre Models e Views
- **Componentes**:
  - `UsuarioController.js` - Operações CRUD de usuários
  - `TarefaController.js` - Operações CRUD de tarefas
  - `CategoriaController.js` - Operações CRUD de categorias
  - `ComentarioController.js` - Operações CRUD de comentários

### 📊 **Models (Modelos)**
- **Responsabilidade**: Interação direta com o banco de dados
- **Componentes**:
  - `UsuarioModel.js` - Queries SQL para usuários
  - `TarefaModel.js` - Queries SQL para tarefas (com JOINs)
  - `CategoriaModel.js` - Queries SQL para categorias
  - `ComentarioModel.js` - Queries SQL para comentários

### 🎨 **Views (Visualizações)**
- **Responsabilidade**: Interface do usuário e apresentação dos dados
- **Estrutura**:
  - **Pages**: Páginas principais do sistema
  - **Components**: Componentes reutilizáveis
  - **Layout**: Template base
  - **Assets**: CSS e JavaScript

### 🗄️ **Banco de Dados**
- **PostgreSQL** com 4 tabelas principais
- **Relacionamentos**: Foreign Keys entre tabelas
- **Configuração**: Centralizada no `database.js`

## Fluxo de Dados

1. **Requisição**: Usuário faz requisição HTTP
2. **Roteamento**: Express direciona para rota apropriada
3. **Controller**: Processa lógica de negócios
4. **Model**: Executa operações no banco de dados
5. **Resposta**: Dados retornados via JSON (API) ou HTML (Pages)
6. **View**: Interface renderizada para o usuário

## Vantagens da Arquitetura MVC

✅ **Separação de Responsabilidades**  
✅ **Facilidade de Manutenção**  
✅ **Reutilização de Código**  
✅ **Testabilidade**  
✅ **Escalabilidade**  

## Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Banco de Dados**: PostgreSQL
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Arquitetura**: MVC Pattern
