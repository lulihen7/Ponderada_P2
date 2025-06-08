// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index.js');

const app = express();
const port = 3333;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da engine EJS e do diretório de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Usa as rotas do index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse em: http://localhost:${port}`);
});
