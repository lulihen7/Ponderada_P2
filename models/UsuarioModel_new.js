const pool = require('../config/database');

module.exports = {
  listar: async () => {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id');
    return rows;
  },

  obterPorId: async (id) => {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return rows[0];
  },

  criar: async (usuario) => {
    const { nome, email, senha_hash } = usuario;
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha_hash]
    );
    return rows[0];
  },

  atualizar: async (id, usuario) => {
    const { nome, email, senha_hash } = usuario;
    const { rows } = await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE id = $4 RETURNING *',
      [nome, email, senha_hash, id]
    );
    return rows[0];
  },

  excluir: async (id) => {
    const { rows } = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
};
