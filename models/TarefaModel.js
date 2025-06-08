const db = require('../config/database');

class TarefaModel {
  static async listar() {
    try {
      const result = await db.query(`
        SELECT t.*, u.nome as usuario_nome, c.nome as categoria_nome 
        FROM tarefas t
        LEFT JOIN usuarios u ON t.usuario_id = u.id
        LEFT JOIN categorias c ON t.categoria_id = c.id
        ORDER BY t.data_criacao DESC
      `);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar tarefas: ${error.message}`);
    }
  }

  static async obterPorId(id) {
    try {
      const result = await db.query(`
        SELECT t.*, u.nome as usuario_nome, c.nome as categoria_nome 
        FROM tarefas t
        LEFT JOIN usuarios u ON t.usuario_id = u.id
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.id = $1
      `, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao obter tarefa: ${error.message}`);
    }
  }

  static async filtrar(filtros) {
    try {
      let query = `
        SELECT t.*, u.nome as usuario_nome, c.nome as categoria_nome 
        FROM tarefas t
        LEFT JOIN usuarios u ON t.usuario_id = u.id
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE 1=1
      `;
      
      const params = [];
      let paramIndex = 1;
      
      if (filtros.concluida !== undefined) {
        query += ` AND t.status = $${paramIndex}`;
        params.push(filtros.concluida ? 'concluída' : 'pendente');
        paramIndex++;
      }
      
      if (filtros.categoria_id) {
        query += ` AND t.categoria_id = $${paramIndex}`;
        params.push(filtros.categoria_id);
        paramIndex++;
      }
      
      if (filtros.usuario_id) {
        query += ` AND t.usuario_id = $${paramIndex}`;
        params.push(filtros.usuario_id);
        paramIndex++;
      }
      
      query += ' ORDER BY t.data_criacao DESC';
      
      const result = await db.query(query, params);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao filtrar tarefas: ${error.message}`);
    }
  }

  static async criar(tarefa) {
    try {
      const { usuario_id, titulo, descricao, data_limite, status, categoria_id } = tarefa;
      
      const result = await db.query(
        `INSERT INTO tarefas 
         (usuario_id, titulo, descricao, data_criacao, data_limite, status, categoria_id) 
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5, $6) 
         RETURNING *`,
        [usuario_id, titulo, descricao, data_limite, status || 'pendente', categoria_id]
      );
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  static async atualizar(id, tarefa) {
    try {
      // Construir dinamicamente a query de atualização com base nos campos fornecidos
      const campos = Object.keys(tarefa).filter(campo => campo !== 'id');
      
      if (campos.length === 0) {
        throw new Error('Nenhum campo fornecido para atualização');
      }
      
      const setClause = campos.map((campo, index) => `${campo} = $${index + 1}`).join(', ');
      const valores = campos.map(campo => tarefa[campo]);
      
      // Adicionar o ID como último parâmetro
      valores.push(id);
      
      const query = `UPDATE tarefas SET ${setClause} WHERE id = $${campos.length + 1} RETURNING *`;
      
      const result = await db.query(query, valores);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
    }
  }

  static async excluir(id) {
    try {
      // Primeiro excluir comentários associados (manter integridade referencial)
      await db.query('DELETE FROM comentarios WHERE tarefa_id = $1', [id]);
      
      // Depois excluir a tarefa
      const result = await db.query(
        'DELETE FROM tarefas WHERE id = $1 RETURNING *',
        [id]
      );
      
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir tarefa: ${error.message}`);
    }
  }
}

module.exports = TarefaModel;