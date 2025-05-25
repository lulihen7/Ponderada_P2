// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js');  // <-- Forçando o uso do index.js diretamente

const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.json());

// Configuração da engine EJS e do diretório de views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Usa as rotas do index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse em: http://localhost:${port}`);
});
