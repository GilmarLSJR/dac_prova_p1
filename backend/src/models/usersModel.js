// Importa a conexão pool com o banco de dados
const db = require('../config/database');

class UsersModel {

    // Busca todos os usuários
    static async findAll() {
        console.log('users_model_findAll');
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    // Busca um usuário pelo ID
    static async findByID(id) {
        console.log('users_model_findByID');
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // Busca um usuário pelo email
    static async findByEmail(email) {
        console.log('users_model_findByEmail');
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
            email,
        ]);
        return rows[0];
    }

    // Cria um novo usuário
    static async create(users) {
        console.log('users_model_create');
        const { name, email, password, phone, role } = users;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, phone, role]
        );
        return result.insertId; // Retorna o ID do usuário criado
    }

    // Atualiza um usuário existente
    static async update(id, users) {
        console.log('user_model_update');
        const { name, email, password, phone, role } = users;
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?',
            [name, email, password, phone, role, id]
        );
        return result.affectedRows; // Retorna o número de linhas afetadas
    }

    // Deleta um usuário pelo ID
    static async delete(id) {
        console.log('users_model_delete');
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}

// Exporta a classe UsersModel para ser usada nos services
module.exports = UsersModel;