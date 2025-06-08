-- Script SQL robusto para criação das tabelas do sistema de tarefas

-- Desabilitar verificação de chaves estrangeiras temporariamente
SET session_replication_role = replica;

-- Limpar dados existentes primeiro (em ordem reversa de dependência)
DROP TABLE IF EXISTS comentarios CASCADE;
DROP TABLE IF EXISTS tarefas CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Reabilitar verificação de chaves estrangeiras
SET session_replication_role = DEFAULT;

-- Criação da tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Criação da tabela de tarefas
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

-- Criação da tabela de comentários
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  tarefa_id INT NOT NULL,
  usuario_id INT NOT NULL,
  texto TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserção dos dados em ordem correta

-- 1. Inserir usuários
INSERT INTO usuarios (nome, email, senha_hash) VALUES 
  ('João Silva', 'joao@email.com', 'hash_placeholder'),
  ('Maria Santos', 'maria@email.com', 'hash_placeholder'),
  ('Pedro Oliveira', 'pedro@email.com', 'hash_placeholder');

-- 2. Inserir categorias
INSERT INTO categorias (nome) VALUES 
  ('Trabalho'),
  ('Pessoal'),
  ('Estudos'),
  ('Urgente');

-- 3. Inserir tarefas usando subconsultas para garantir IDs corretos
INSERT INTO tarefas (usuario_id, titulo, descricao, status, categoria_id, data_limite) 
VALUES 
  (
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    'Finalizar relatório mensal', 
    'Completar o relatório de vendas do mês', 
    'em progresso', 
    (SELECT id FROM categorias WHERE nome = 'Trabalho'),
    CURRENT_DATE + INTERVAL '3 days'
  ),
  (
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    'Reunião com cliente', 
    'Apresentar proposta para novo projeto', 
    'pendente', 
    (SELECT id FROM categorias WHERE nome = 'Trabalho'),
    CURRENT_DATE + INTERVAL '1 day'
  ),
  (
    (SELECT id FROM usuarios WHERE email = 'maria@email.com'),
    'Comprar ingredientes', 
    'Lista de compras para jantar especial', 
    'pendente', 
    (SELECT id FROM categorias WHERE nome = 'Pessoal'),
    CURRENT_DATE
  ),
  (
    (SELECT id FROM usuarios WHERE email = 'maria@email.com'),
    'Estudar JavaScript', 
    'Revisar conceitos de async/await', 
    'em progresso', 
    (SELECT id FROM categorias WHERE nome = 'Estudos'),
    CURRENT_DATE + INTERVAL '5 days'
  ),
  (
    (SELECT id FROM usuarios WHERE email = 'pedro@email.com'),
    'Exercitar-se', 
    'Ir à academia pela manhã', 
    'concluída', 
    (SELECT id FROM categorias WHERE nome = 'Pessoal'),
    CURRENT_DATE - INTERVAL '1 day'
  ),
  (
    (SELECT id FROM usuarios WHERE email = 'pedro@email.com'),
    'Ler livro técnico', 
    'Terminar capítulo sobre design patterns', 
    'pendente', 
    (SELECT id FROM categorias WHERE nome = 'Estudos'),
    CURRENT_DATE + INTERVAL '7 days'
  );

-- 4. Inserir comentários usando subconsultas para garantir IDs corretos
INSERT INTO comentarios (tarefa_id, usuario_id, texto) 
VALUES 
  (
    (SELECT id FROM tarefas WHERE titulo = 'Finalizar relatório mensal' LIMIT 1),
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    'Preciso revisar os números da última semana'
  ),
  (
    (SELECT id FROM tarefas WHERE titulo = 'Finalizar relatório mensal' LIMIT 1),
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    'Já coletei 80% dos dados necessários'
  ),
  (
    (SELECT id FROM tarefas WHERE titulo = 'Estudar JavaScript' LIMIT 1),
    (SELECT id FROM usuarios WHERE email = 'maria@email.com'),
    'Encontrei um ótimo tutorial sobre o assunto'
  ),
  (
    (SELECT id FROM tarefas WHERE titulo = 'Ler livro técnico' LIMIT 1),
    (SELECT id FROM usuarios WHERE email = 'pedro@email.com'),
    'Este livro está sendo muito útil para o projeto atual'
  );

-- Verificar se tudo foi inserido corretamente
SELECT 
  'Inicialização concluída com sucesso!' as status,
  (SELECT COUNT(*) FROM usuarios) as total_usuarios,
  (SELECT COUNT(*) FROM categorias) as total_categorias,
  (SELECT COUNT(*) FROM tarefas) as total_tarefas,
  (SELECT COUNT(*) FROM comentarios) as total_comentarios;

-- Mostrar alguns dados de exemplo
SELECT 'USUÁRIOS' as tabela, id, nome, email FROM usuarios
UNION ALL
SELECT 'CATEGORIAS' as tabela, id::text, nome, '' FROM categorias
ORDER BY tabela, id;