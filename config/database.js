require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  // Configurações do pool para melhor estabilidade
  max: 10, // máximo de 10 conexões no pool
  min: 2,  // mínimo de 2 conexões no pool
  idleTimeoutMillis: 30000, // fecha conexão inativa após 30s
  connectionTimeoutMillis: 10000, // timeout de conexão: 10s
  maxUses: 7500, // reutilizar conexão até 7500 vezes
  allowExitOnIdle: true
});

// Tratamento de erros do pool
pool.on('error', (err) => {
  console.error('🔥 Erro inesperado no pool de conexões:', err);
});

pool.on('connect', () => {
  console.log('✅ Conectado ao banco de dados PostgreSQL');
});

// Função para testar a conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.stack);
  } else {
    console.log('🚀 Pool de conexões PostgreSQL inicializado com sucesso!');
    release();
  }
});

module.exports = pool;
