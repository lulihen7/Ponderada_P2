const pool = require('../config/database');

module.exports = {
  listar: async () => {
    const { rows } = await pool.query('SELECT * FROM categorias');
    return rows;
  },

  obterPorId: async (id) => {
    const { rows } = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
    return rows[0];
  },

  criar: async (categoria) => {
    const { nome } = categoria;
    const { rows } = await pool.query(
      'INSERT INTO categorias (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    return rows[0];
  },

  atualizar: async (id, categoria) => {
    const { nome } = categoria;
    const { rows } = await pool.query(
      'UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    return rows[0];
  },

  excluir: async (id) => {
    const { rows } = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },
};
