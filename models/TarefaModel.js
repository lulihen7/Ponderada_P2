const pool = require('../config/database');

module.exports = {  listar: async () => {
    const { rows } = await pool.query(`
      SELECT 
        t.*,
        u.nome as usuario_nome,
        c.nome as categoria_nome
      FROM tarefas t
      LEFT JOIN usuarios u ON t.usuario_id = u.id
      LEFT JOIN categorias c ON t.categoria_id = c.id
      ORDER BY t.data_criacao DESC
    `);
    return rows;
  },
  obterPorId: async (id) => {
    const { rows } = await pool.query(`
      SELECT 
        t.*,
        u.nome as usuario_nome,
        c.nome as categoria_nome
      FROM tarefas t
      LEFT JOIN usuarios u ON t.usuario_id = u.id
      LEFT JOIN categorias c ON t.categoria_id = c.id
      WHERE t.id = $1
    `, [id]);
    return rows[0];
  },

  criar: async (tarefa) => {
    const { titulo, descricao, usuario_id, categoria_id, data_limite, status } = tarefa;
    const { rows } = await pool.query(
      'INSERT INTO tarefas (titulo, descricao, usuario_id, categoria_id, data_limite, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, descricao, usuario_id, categoria_id, data_limite, status]
    );
    return rows[0];
  },
  atualizar: async (id, tarefa) => {
    const { titulo, descricao, usuario_id, categoria_id, data_limite, status } = tarefa;
    const { rows } = await pool.query(
      'UPDATE tarefas SET titulo = $1, descricao = $2, usuario_id = $3, categoria_id = $4, data_limite = $5, status = $6 WHERE id = $7 RETURNING *',
      [titulo, descricao, usuario_id, categoria_id, data_limite, status, id]
    );
    return rows[0];
  },

  excluir: async (id) => {
    const { rows } = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },
};
