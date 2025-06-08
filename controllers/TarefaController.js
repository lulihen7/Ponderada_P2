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
    const resultado = await TarefaModel.excluir(req.params.id);
    if (!resultado) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.marcarConcluida = async (req, res) => {
  try {
    const tarefa = await TarefaModel.atualizar(req.params.id, { concluida: true });
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.desmarcarConcluida = async (req, res) => {
  try {
    const tarefa = await TarefaModel.atualizar(req.params.id, { concluida: false });
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTarefasConcluidas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.filtrar({ concluida: true });
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTarefasPendentes = async (req, res) => {
  try {
    const tarefas = await TarefaModel.filtrar({ concluida: false });
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};