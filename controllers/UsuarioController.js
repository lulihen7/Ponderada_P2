const UsuarioModel = require('../models/UsuarioModel');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.listar();
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.obterUsuarioPorId = async (req, res) => {
  try {
    const usuario = await UsuarioModel.obterPorId(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Erro ao obter usuário:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    const dadosUsuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha_hash: 'hash_placeholder' // Por enquanto um placeholder
    };
    
    console.log('📝 Tentando criar usuário:', { nome: dadosUsuario.nome, email: dadosUsuario.email });
    
    const usuario = await UsuarioModel.criar(dadosUsuario);
    
    console.log('✅ Usuário criado com sucesso:', usuario.id);
    res.status(201).json(usuario);
  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err);
    
    // Tratamento específico para diferentes tipos de erro
    if (err.code === '23505') { // Violação de constraint UNIQUE
      res.status(400).json({ error: 'Este email já está cadastrado no sistema' });
    } else if (err.code === '23502') { // Violação de NOT NULL
      res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    } else if (err.message.includes('connection')) {
      res.status(503).json({ error: 'Problema de conexão com o banco de dados. Tente novamente.' });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor: ' + err.message });
    }
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    
    // Mantendo o placeholder da senha_hash para atualização
    const dadosUsuario = {
      nome,
      email,
      senha_hash: 'hash_placeholder' // Idealmente, isso não deveria ser atualizado sem validação
    };
    
    const usuario = await UsuarioModel.atualizar(req.params.id, dadosUsuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Erro ao editar usuário:', err);
    if (err.message.includes('duplicate') || err.message.includes('unique')) {
      res.status(400).json({ error: 'Email já está em uso' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.excluirUsuario = async (req, res) => {
  try {
    const resultado = await UsuarioModel.excluir(req.params.id);
    if (!resultado) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ error: err.message });
  }
};