const db = require('../config/database');

class ComentarioModel {
  static async listar() {
    try {
      const result = await db.query(`
        SELECT c.*, u.nome as usuario_nome 
        FROM comentarios c
        JOIN usuarios u ON c.usuario_id = u.id
        ORDER BY c.data_criacao DESC
      `);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar comentários: ${error.message}`);
    }
  }

  static async obterPorId(id) {
    try {
      const result = await db.query(`
        SELECT c.*, u.nome as usuario_nome 
        FROM comentarios c
        JOIN usuarios u ON c.usuario_id = u.id
        WHERE c.id = $1
      `, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao obter comentário: ${error.message}`);
    }
  }

  static async listarPorTarefa(tarefaId) {
    try {
      const result = await db.query(`
        SELECT c.*, u.nome as usuario_nome 
        FROM comentarios c
        JOIN usuarios u ON c.usuario_id = u.id
        WHERE c.tarefa_id = $1
        ORDER BY c.data_criacao DESC
      `, [tarefaId]);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar comentários da tarefa: ${error.message}`);
    }
  }

  static async criar(comentario) {
    try {
      const { tarefa_id, usuario_id, texto } = comentario;
      const result = await db.query(
        `INSERT INTO comentarios (tarefa_id, usuario_id, texto, data_criacao) 
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
         RETURNING *`,
        [tarefa_id, usuario_id, texto]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar comentário: ${error.message}`);
    }
  }

  static async atualizar(id, comentario) {
    try {
      const { texto } = comentario;
      const result = await db.query(
        'UPDATE comentarios SET texto = $1 WHERE id = $2 RETURNING *',
        [texto, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar comentário: ${error.message}`);
    }
  }

  static async excluir(id) {
    try {
      const result = await db.query(
        'DELETE FROM comentarios WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir comentário: ${error.message}`);
    }
  }
}

module.exports = ComentarioModel;