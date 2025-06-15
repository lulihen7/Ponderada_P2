const pool = require('../config/database');

module.exports = {
  listar: async () => {
    const { rows } = await pool.query('SELECT * FROM comentarios');
    return rows;
  },

  obterPorId: async (id) => {
    const { rows } = await pool.query('SELECT * FROM comentarios WHERE id = $1', [id]);
    return rows[0];
  },

  criar: async (comentario) => {
    const { tarefa_id, usuario_id, texto } = comentario;
    const { rows } = await pool.query(
      'INSERT INTO comentarios (tarefa_id, usuario_id, texto) VALUES ($1, $2, $3) RETURNING *',
      [tarefa_id, usuario_id, texto]
    );
    return rows[0];
  },

  atualizar: async (id, comentario) => {
    const { texto } = comentario;
    const { rows } = await pool.query(
      'UPDATE comentarios SET texto = $1, data_criacao = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [texto, id]
    );
    return rows[0];
  },

  excluir: async (id) => {
    const { rows } = await pool.query('DELETE FROM comentarios WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },
};
