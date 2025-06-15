const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para adicionar currentPage às views
app.use((req, res, next) => {
  // Determinar página atual baseada na URL
  let currentPage = '';
  if (req.path === '/') {
    currentPage = 'dashboard';
  } else if (req.path.includes('tarefas')) {
    currentPage = 'tarefas';
  } else if (req.path.includes('usuarios')) {
    currentPage = 'usuarios';
  } else if (req.path.includes('categorias')) {
    currentPage = 'categorias';
  }
  
  res.locals.currentPage = currentPage;
  next();
});

// Rotas das APIs
const apiRoutes = require("./routes/index.js");
app.use("/api", apiRoutes);

// Rotas das páginas/views
const frontRoutes = require("./routes/fRoutes.js");
app.use("/", frontRoutes);

// Middleware de tratamento de erro 404
app.use((req, res) => {
  res.status(404).render('error', {
    pageTitle: 'Página não encontrada',
    title: 'Página não encontrada',
    error: { status: 404 },
    message: 'A página que você está procurando não existe.'
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro no servidor:', error);
  res.status(500).render('error', {
    pageTitle: 'Erro interno',
    error: { status: 500 },
    title: 'Erro 500',
    message: 'Erro interno do servidor'
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📱 Acesse: http://localhost:${port}`);
});
// Configurar EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));