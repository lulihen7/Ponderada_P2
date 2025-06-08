-- Script SQL simplificado para criação das tabelas

-- Limpar completamente e recriar as tabelas
DROP TABLE IF EXISTS comentarios CASCADE;
DROP TABLE IF EXISTS tarefas CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Criar tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Criar tabela de tarefas
CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_limite DATE,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em progresso', 'concluída')),
  categoria_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Criar tabela de comentários
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  tarefa_id INT NOT NULL,
  usuario_id INT NOT NULL,
  texto TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserir dados básicos apenas

-- Usuários
INSERT INTO usuarios (nome, email, senha_hash) VALUES 
  ('João Silva', 'joao@email.com', 'hash_placeholder'),
  ('Maria Santos', 'maria@email.com', 'hash_placeholder'),
  ('Pedro Oliveira', 'pedro@email.com', 'hash_placeholder');

-- Categorias
INSERT INTO categorias (nome) VALUES 
  ('Trabalho'),
  ('Pessoal'),
  ('Estudos'),
  ('Urgente');

-- Tarefas básicas (sem categoria para evitar problemas)
INSERT INTO tarefas (usuario_id, titulo, descricao, status, data_limite) VALUES 
  (1, 'Primeira tarefa', 'Descrição da primeira tarefa', 'pendente', CURRENT_DATE + INTERVAL '1 week'),
  (2, 'Segunda tarefa', 'Descrição da segunda tarefa', 'em progresso', CURRENT_DATE + INTERVAL '3 days'),
  (3, 'Terceira tarefa', 'Descrição da terceira tarefa', 'concluída', CURRENT_DATE);

-- Atualizar algumas tarefas com categorias (depois que as tarefas já existem)
UPDATE tarefas SET categoria_id = 1 WHERE id = 1; -- Trabalho
UPDATE tarefas SET categoria_id = 2 WHERE id = 2; -- Pessoal  
UPDATE tarefas SET categoria_id = 3 WHERE id = 3; -- Estudos

-- Comentários básicos
INSERT INTO comentarios (tarefa_id, usuario_id, texto) VALUES 
  (1, 1, 'Comentário na primeira tarefa'),
  (2, 2, 'Comentário na segunda tarefa'),
  (3, 3, 'Comentário na terceira tarefa');

-- Resultado final
SELECT 
  'Banco inicializado com sucesso!' as mensagem,
  (SELECT COUNT(*) FROM usuarios) as usuarios,
  (SELECT COUNT(*) FROM categorias) as categorias,
  (SELECT COUNT(*) FROM tarefas) as tarefas,
  (SELECT COUNT(*) FROM comentarios) as comentarios;