const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const runSQLScript = async () => {
  let client;
  
  try {
    // Conectar ao banco
    client = await pool.connect();
    console.log('✅ Conectado ao banco de dados PostgreSQL');
    
    // Verificar qual script usar baseado nos argumentos
    const useForceReset = process.argv.includes('--reset');
    const useRobust = process.argv.includes('--robust');
    
    let scriptName;
    if (useRobust) {
      scriptName = 'init.sql';
    } else if (useForceReset) {
      scriptName = 'simple-init.sql';
    } else {
      scriptName = 'safe-init.sql';
    }
    
    // Verificar se o arquivo de script existe
    let filePath = path.join(__dirname, scriptName);
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Arquivo ${scriptName} não encontrado, usando simple-init.sql`);
      filePath = path.join(__dirname, 'simple-init.sql');
    }
    
    console.log(`📄 Executando script: ${scriptName}`);
    
    if (useForceReset) {
      console.log('⚠️  MODO RESET: Todos os dados serão apagados e recriados!');
    }
    
    // Ler o arquivo SQL
    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Executar o script SQL
    const result = await client.query(sql);
    
    console.log('✅ Script SQL executado com sucesso!');
    
    // Se houver resultado, mostrar
    if (result && result.rows && result.rows.length > 0) {
      console.log('📊 Resultado:');
      console.table(result.rows);
    }
    
  } catch (err) {
    console.error('❌ Erro ao executar o script SQL:');
    console.error('Detalhes:', err.message);
    
    if (err.code === '23503') {
      console.log('\n💡 Dica: Parece que há problemas com chaves estrangeiras.');
      console.log('Tente executar com --reset para recriar tudo do zero:');
      console.log('npm run init-db -- --reset');
    }
    
    if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Dica: Verifique se o PostgreSQL está rodando e se as configurações do .env estão corretas.');
    }
    
    process.exit(1);
  } finally {
    // Fechar conexão
    if (client) {
      client.release();
    }
    await pool.end();
    console.log('🔌 Conexão com banco de dados fechada');
  }
};

// Mostrar ajuda
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🗃️  Script de Inicialização do Banco de Dados - Tarefas+

Uso:
  npm run init-db                # Execução segura (preserva dados existentes)
  npm run init-db -- --reset     # Reset simples (recria com dados básicos)
  npm run init-db -- --robust    # Reset robusto (dados completos)
  npm run init-db -- --help      # Mostra esta ajuda

Scripts disponíveis:
  safe-init.sql    - Preserva dados existentes (padrão)
  simple-init.sql  - Reset simples com dados básicos (--reset)
  init.sql         - Reset robusto com dados completos (--robust)

Configuração:
  Certifique-se de ter um arquivo .env com as configurações do banco:
  
  DB_USER=seu_usuario
  DB_HOST=localhost
  DB_DATABASE=nome_do_banco
  DB_PASSWORD=sua_senha
  DB_PORT=5432
`);
  process.exit(0);
}

console.log('🚀 Iniciando configuração do banco de dados...');
runSQLScript();