const db = require('../config/database');

class CategoriaModel {
  static async listar() {
    try {
      const result = await db.query('SELECT * FROM categorias ORDER BY nome');
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar categorias: ${error.message}`);
    }
  }

  static async obterPorId(id) {
    try {
      const result = await db.query('SELECT * FROM categorias WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao obter categoria: ${error.message}`);
    }
  }

  static async criar(categoria) {
    try {
      const { nome } = categoria;
      const result = await db.query(
        'INSERT INTO categorias (nome) VALUES ($1) RETURNING *',
        [nome]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar categoria: ${error.message}`);
    }
  }

  static async atualizar(id, categoria) {
    try {
      const { nome } = categoria;
      const result = await db.query(
        'UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *',
        [nome, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }
  }

  static async excluir(id) {
    try {
      // Verificar se existem tarefas usando esta categoria
      const tarefasComCategoria = await db.query(
        'SELECT COUNT(*) FROM tarefas WHERE categoria_id = $1',
        [id]
      );
      
      if (parseInt(tarefasComCategoria.rows[0].count) > 0) {
        throw new Error('Não é possível excluir categoria com tarefas associadas');
      }
      
      const result = await db.query(
        'DELETE FROM categorias WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir categoria: ${error.message}`);
    }
  }
}

module.exports = CategoriaModel;