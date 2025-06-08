const db = require('../config/database');

class UsuarioModel {
  static async getAll() {
    try {
      const result = await db.query('SELECT * FROM usuarios ORDER BY nome');
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao obter usuário: ${error.message}`);
    }
  }

  static async create(data) {
    try {
      const { nome, email, senha_hash } = data;
      const result = await db.query(
        'INSERT INTO usuarios (nome, email, senha_hash, data_criacao) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
        [nome, email, senha_hash || 'temp_hash']
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  static async update(id, data) {
    try {
      const { nome, email } = data;
      const result = await db.query(
        'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [nome, email, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir usuário: ${error.message}`);
    }
  }
}

module.exports = UsuarioModel;