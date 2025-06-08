const express = require('express');
const router = express.Router();

console.log("Arquivo index.js carregado!");

// === VIEWS (PÁGINAS) ===
// Rota principal - Dashboard de tarefas
router.get("/", (req, res) => {
  res.render("pages/dashboard", { pageTitle: "Tarefas+ | Dashboard" });
});

// Página de usuários
router.get("/usuarios-page", (req, res) => {
  res.render("pages/usuarios", { pageTitle: "Tarefas+ | Usuários" });
});

// Página de tarefas
router.get("/tarefas-page", (req, res) => {
  res.render("pages/tarefas", { pageTitle: "Tarefas+ | Gerenciar Tarefas" });
});

// Página de categorias
router.get("/categorias-page", (req, res) => {
  res.render("pages/categorias", { pageTitle: "Tarefas+ | Categorias" });
});

// === API ROUTES ===

// --- TAREFAS ---
const TarefaController = require('../controllers/TarefaController');
router.get('/api/tarefas', TarefaController.listarTarefas);
router.get('/api/tarefas/:id', TarefaController.obterTarefaPorId);
router.post('/api/tarefas', TarefaController.criarTarefa);
router.put('/api/tarefas/:id', TarefaController.editarTarefa);
router.delete('/api/tarefas/:id', TarefaController.excluirTarefa);

// --- USUÁRIOS ---
const UsuarioController = require('../controllers/UsuarioController');
router.get('/api/usuarios', UsuarioController.listarUsuarios);
router.get('/api/usuarios/:id', UsuarioController.obterUsuarioPorId);
router.post('/api/usuarios', UsuarioController.criarUsuario);
router.put('/api/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/api/usuarios/:id', UsuarioController.excluirUsuario);

// --- CATEGORIAS ---
const CategoriaController = require('../controllers/CategoriaController');
router.get('/api/categorias', CategoriaController.listarCategorias);
router.get('/api/categorias/:id', CategoriaController.obterCategoriaPorId);
router.post('/api/categorias', CategoriaController.criarCategoria);
router.put('/api/categorias/:id', CategoriaController.editarCategoria);
router.delete('/api/categorias/:id', CategoriaController.excluirCategoria);

// --- COMENTÁRIOS ---
const ComentarioController = require('../controllers/ComentarioController');
router.get('/api/comentarios', ComentarioController.listarComentarios);
router.get('/api/comentarios/:id', ComentarioController.obterComentarioPorId);
router.post('/api/comentarios', ComentarioController.criarComentario);
router.put('/api/comentarios/:id', ComentarioController.editarComentario);
router.delete('/api/comentarios/:id', ComentarioController.excluirComentario);

module.exports = router;
