// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index.js");
const frontRoutes = require("./routes/fRoutes.js");

const app = express();
const port = 3000;

// Configurar EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas da API
app.use("/api", routes);

// Rotas das views/páginas
app.use("/", frontRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});