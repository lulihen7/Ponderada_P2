-- Script seguro para inicialização do banco de dados
-- Este script apenas cria as tabelas se elas não existirem e insere dados apenas se necessário

-- Criar tabela de usuários se não existir
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de categorias se não existir
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Criar tabela de tarefas se não existir
CREATE TABLE IF NOT EXISTS tarefas (
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

-- Criar tabela de comentários se não existir
CREATE TABLE IF NOT EXISTS comentarios (
  id SERIAL PRIMARY KEY,
  tarefa_id INT NOT NULL,
  usuario_id INT NOT NULL,
  texto TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserir dados apenas se as tabelas estiverem vazias

-- Usuários de exemplo (apenas se não houver usuários)
INSERT INTO usuarios (nome, email, senha_hash) 
SELECT 'João Silva', 'joao@email.com', 'hash_placeholder'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'joao@email.com');

INSERT INTO usuarios (nome, email, senha_hash) 
SELECT 'Maria Santos', 'maria@email.com', 'hash_placeholder'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'maria@email.com');

INSERT INTO usuarios (nome, email, senha_hash) 
SELECT 'Pedro Oliveira', 'pedro@email.com', 'hash_placeholder'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'pedro@email.com');

-- Categorias de exemplo (apenas se não houver categorias)
INSERT INTO categorias (nome) 
SELECT 'Trabalho'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Trabalho');

INSERT INTO categorias (nome) 
SELECT 'Pessoal'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Pessoal');

INSERT INTO categorias (nome) 
SELECT 'Estudos'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Estudos');

INSERT INTO categorias (nome) 
SELECT 'Urgente'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Urgente');

-- Tarefas de exemplo (apenas se não houver tarefas)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM tarefas) THEN
    INSERT INTO tarefas (usuario_id, titulo, descricao, status, categoria_id, data_limite) 
    VALUES 
      (
        (SELECT id FROM usuarios WHERE email = 'joao@email.com' LIMIT 1),
        'Finalizar relatório mensal', 
        'Completar o relatório de vendas do mês', 
        'em progresso', 
        (SELECT id FROM categorias WHERE nome = 'Trabalho' LIMIT 1),
        CURRENT_DATE + INTERVAL '3 days'
      ),
      (
        (SELECT id FROM usuarios WHERE email = 'maria@email.com' LIMIT 1),
        'Estudar JavaScript', 
        'Revisar conceitos de async/await', 
        'pendente', 
        (SELECT id FROM categorias WHERE nome = 'Estudos' LIMIT 1),
        CURRENT_DATE + INTERVAL '5 days'
      ),
      (
        (SELECT id FROM usuarios WHERE email = 'pedro@email.com' LIMIT 1),
        'Exercitar-se', 
        'Ir à academia pela manhã', 
        'concluída', 
        (SELECT id FROM categorias WHERE nome = 'Pessoal' LIMIT 1),
        CURRENT_DATE
      );
  END IF;
END $$;

-- Verificar se tudo foi criado corretamente
SELECT 
  'Inicialização segura concluída!' as status,
  (SELECT COUNT(*) FROM usuarios) as total_usuarios,
  (SELECT COUNT(*) FROM categorias) as total_categorias,
  (SELECT COUNT(*) FROM tarefas) as total_tarefas,
  (SELECT COUNT(*) FROM comentarios) as total_comentarios;