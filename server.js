const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3334;

// Middlewares básicos
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da engine EJS e do diretório de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta public (CORREÇÃO PRINCIPAL)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas alternativas para compatibilidade (caso você tenha CSS/JS nas views)
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));

// Importar e usar as rotas
const apiRoutes = require('./routes/index.js');
const viewRoutes = require('./routes/views'); // Se você tiver rotas específicas para views

// Usar as rotas
app.use('/api', apiRoutes); // Rotas da API
app.use('/', viewRoutes);   // Rotas das views (se existir)

// Rota principal caso não tenha arquivo de rotas de views
app.get('/', (req, res) => {
  res.render('index', { title: 'Sistema de Gerenciamento de Tarefas' });
});

// Rota para servir a página de tarefas
app.get('/tarefas', (req, res) => {
  res.render('tarefas/index', { title: 'Tarefas' });
});

// Rota para servir a página de categorias
app.get('/categorias', (req, res) => {
  res.render('categorias/index', { title: 'Categorias' });
});

// Rota para servir a página de usuários
app.get('/usuarios', (req, res) => {
  res.render('usuarios/index', { title: 'Usuários' });
});

// Middleware de tratamento de erros 404
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Página não encontrada',
    message: 'A página que você está procurando não existe.',
    error: { status: 404 }
  });
});

// Middleware de tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Erro interno',
    message: 'Ocorreu um erro interno no servidor.',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});

module.exports = app;