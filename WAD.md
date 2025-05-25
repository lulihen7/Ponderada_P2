# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Sistema de Reserva de Salas do Inteli

#### [Henrique rodrigues diniz](https://www.linkedin.com/in/henrique-rodrigues-diniz-b7b011319/)

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

## 1. Introdução

O **Sistema de Reserva de Salas do Inteli** é uma aplicação web desenvolvida para facilitar o processo de agendamento de salas de estudo, salas de reunião e espaços multiuso dentro da instituição. Seu objetivo principal é **otimizar a gestão dos espaços físicos**, evitando conflitos de horários e garantindo que os usuários tenham acesso rápido e confiável às informações de disponibilidade.

Por meio da plataforma, os usuários podem **visualizar as salas disponíveis**, **realizar reservas**, **cancelar agendamentos** e acompanhar suas reservas anteriores. O sistema foi projetado para atender tanto **estudantes**, que precisam reservar salas para trabalhos em grupo, quanto **professores e colaboradores**, que utilizam os espaços para reuniões, aulas e atividades acadêmicas. A aplicação busca oferecer uma **experiência intuitiva e eficiente**, com funcionalidades que simplificam o agendamento, reduzem o risco de conflitos e promovem uma melhor utilização dos recursos físicos da instituição.




---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web


## 3. Projeto da Aplicação Web

### 3.1. Modelagem do Banco de Dados (Semana 3)

A modelagem do banco de dados do sistema de Gerenciamento de Tarefas foi projetada com base em um modelo relacional que reflete as necessidades funcionais da aplicação, garantindo organização, consistência e escalabilidade dos dados. O sistema é estruturado em quatro entidades principais: **Usuários (usuarios)**, **Categorias (categorias)**, **Tarefas (tarefas)** e **Comentários (comentarios)**. Cada entidade foi definida para suportar funcionalidades essenciais como cadastro, organização de tarefas e comunicação via comentários.

Abaixo está o script SQL completo para criação das tabelas e relacionamentos:

```sql
-- Criação da tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,                                    -- Identificador único do usuário com auto-incremento
  nome VARCHAR(100) NOT NULL,                               -- Nome do usuário
  email VARCHAR(100) UNIQUE NOT NULL,                       -- Email único para cada usuário
  senha_hash TEXT NOT NULL,                                 -- Hash da senha para segurança
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP          -- Data de criação do registro
);

-- Criação da tabela de categorias de tarefas (opcional)
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,                                    -- Identificador único da categoria
  nome VARCHAR(50) NOT NULL                                 -- Nome descritivo da categoria
);

-- Criação da tabela de tarefas
CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,                                    -- Identificador único da tarefa
  usuario_id INT NOT NULL,                                  -- Referência obrigatória ao usuário que criou a tarefa
  titulo VARCHAR(255) NOT NULL,                             -- Título descritivo da tarefa
  descricao TEXT,                                           -- Descrição opcional da tarefa
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Data de criação da tarefa
  data_limite DATE,                                         -- Data limite para conclusão (opcional)
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em progresso', 'concluída')), -- Status com validação
  categoria_id INT,                                         -- Referência opcional a uma categoria
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),         -- Chave estrangeira para usuário
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)      -- Chave estrangeira para categoria
);

-- Criação da tabela de comentários para cada tarefa (opcional)
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,                                    -- Identificador único do comentário
  tarefa_id INT NOT NULL,                                   -- Referência à tarefa comentada
  usuario_id INT NOT NULL,                                  -- Referência ao usuário que comentou
  texto TEXT NOT NULL,                                      -- Texto do comentário
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Data de criação do comentário
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id),           -- Chave estrangeira para tarefa
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)          -- Chave estrangeira para usuário
```
);
3.1.1. Explicação do Modelo de Dados
Tabela usuarios
Armazena as informações dos usuários do sistema. Inclui nome, email (único), senha (hash para segurança) e data de criação.
A chave primária id garante a identificação única de cada usuário.

Tabela categorias
Permite organizar tarefas em categorias. Cada categoria tem um identificador e um nome descritivo.

Tabela tarefas
Núcleo do sistema, armazena as tarefas com título, descrição, data de criação, data limite opcional, status e categoria.
Cada tarefa pertence a um usuário (via usuario_id) e pode opcionalmente estar vinculada a uma categoria (categoria_id).
O campo status restringe os valores para garantir a consistência dos dados.

Tabela comentarios
Permite comentários em tarefas, vinculando cada comentário ao usuário que o fez e à tarefa correspondente.
Suporta a comunicação e o acompanhamento das atividades.

3.1.2. Executando o Script do Banco de Dados
Certifique-se de que o PostgreSQL está instalado e em execução.

Abra seu cliente PostgreSQL preferido (psql, DBeaver, TablePlus).

Execute o script SQL acima para criar as tabelas e relacionamentos.

```psql -U seu_usuario -d seu_banco -a -f caminho/para/o_script.sql```

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
