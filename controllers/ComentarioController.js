const ComentarioModel = require('../models/ComentarioModel');

exports.listarComentarios = async (req, res) => {
  try {
    const comentarios = await ComentarioModel.listar();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterComentarioPorId = async (req, res) => {
  try {
    const comentario = await ComentarioModel.obterPorId(req.params.id);
    if (!comentario) return res.status(404).json({ message: 'Comentário não encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarComentario = async (req, res) => {
  try {
    const comentario = await ComentarioModel.criar(req.body);
    res.status(201).json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarComentario = async (req, res) => {
  try {
    const comentario = await ComentarioModel.atualizar(req.params.id, req.body);
    if (!comentario) return res.status(404).json({ message: 'Comentário não encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirComentario = async (req, res) => {
  try {
    const comentario = await ComentarioModel.excluir(req.params.id);
    if (!comentario) return res.status(404).json({ message: 'Comentário não encontrado' });
    res.json({ message: 'Comentário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listarComentarios: exports.listarComentarios,
  obterComentarioPorId: exports.obterComentarioPorId,
  criarComentario: exports.criarComentario,
  editarComentario: exports.editarComentario,
  excluirComentario: exports.excluirComentario
};
