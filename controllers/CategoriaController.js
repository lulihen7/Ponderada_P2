const CategoriaModel = require('../models/CategoriaModel');

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaModel.listar();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterCategoriaPorId = async (req, res) => {
  try {
    const categoria = await CategoriaModel.obterPorId(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaModel.criar(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaModel.atualizar(req.params.id, req.body);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaModel.excluir(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listarCategorias: exports.listarCategorias,
  obterCategoriaPorId: exports.obterCategoriaPorId,
  criarCategoria: exports.criarCategoria,
  editarCategoria: exports.editarCategoria,
  excluirCategoria: exports.excluirCategoria
};
