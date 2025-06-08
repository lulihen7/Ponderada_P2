const UsuarioModel = require('../models/UsuarioModel');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterUsuarioPorId = async (req, res) => {
  try {
    const usuario = await UsuarioModel.getById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.update(req.params.id, req.body);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUsuario = async (req, res) => {
  try {
    const resultado = await UsuarioModel.delete(req.params.id);
    if (!resultado) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};