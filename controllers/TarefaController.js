const TarefaModel = require('../models/TarefaModel');

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.listar();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterTarefaPorId = async (req, res) => {
  try {
    const tarefa = await TarefaModel.obterPorId(req.params.id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaModel.criar(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaModel.atualizar(req.params.id, req.body);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaModel.excluir(req.params.id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listarTarefas: exports.listarTarefas,
  obterTarefaPorId: exports.obterTarefaPorId,
  criarTarefa: exports.criarTarefa,
  editarTarefa: exports.editarTarefa,
  excluirTarefa: exports.excluirTarefa
};
