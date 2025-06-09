const express = require('express');
const router = express.Router();

console.log("Arquivo de rotas da API carregado!");

// === API ROUTES ===

// --- TAREFAS ---
const TarefaController = require('../controllers/TarefaController');
router.get('/tarefas', TarefaController.listarTarefas);
router.get('/tarefas/:id', TarefaController.obterTarefaPorId);
router.post('/tarefas', TarefaController.criarTarefa);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// --- USUÁRIOS ---
const UsuarioController = require('../controllers/UsuarioController');
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.obterUsuarioPorId);
router.post('/usuarios', UsuarioController.criarUsuario);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

// --- CATEGORIAS ---
const CategoriaController = require('../controllers/CategoriaController');
router.get('/categorias', CategoriaController.listarCategorias);
router.get('/categorias/:id', CategoriaController.obterCategoriaPorId);
router.post('/categorias', CategoriaController.criarCategoria);
router.put('/categorias/:id', CategoriaController.editarCategoria);
router.delete('/categorias/:id', CategoriaController.excluirCategoria);

// --- COMENTÁRIOS ---
const ComentarioController = require('../controllers/ComentarioController');
router.get('/comentarios', ComentarioController.listarComentarios);
router.get('/comentarios/:id', ComentarioController.obterComentarioPorId);
router.post('/comentarios', ComentarioController.criarComentario);
router.put('/comentarios/:id', ComentarioController.editarComentario);
router.delete('/comentarios/:id', ComentarioController.excluirComentario);

module.exports = router;