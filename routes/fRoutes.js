const express = require('express');
const router = express.Router();

// Rota principal - Dashboard
router.get("/", (req, res) => {
  res.render("pages/dashboard", { 
    pageTitle: "Tarefas+ | Dashboard",
    currentPage: "dashboard"
  });
});

// Página de usuários
router.get("/usuarios-page", (req, res) => {
  res.render("pages/usuarios", { 
    pageTitle: "Tarefas+ | Usuários",
    currentPage: "usuarios"
  });
});

// Página de tarefas
router.get("/tarefas-page", (req, res) => {
  res.render("pages/tarefas", { 
    pageTitle: "Tarefas+ | Gerenciar Tarefas",
    currentPage: "tarefas"
  });
});

// Página de categorias
router.get("/categorias-page", (req, res) => {
  res.render("pages/categorias", { 
    pageTitle: "Tarefas+ | Categorias",
    currentPage: "categorias"
  });
});

module.exports = router;