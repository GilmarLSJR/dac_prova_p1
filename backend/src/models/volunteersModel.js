// Importa a conexão pool com o banco de dados
const db = require('../config/database');

class VolunteersModel {

    // Busca todos os voluntários
    static async findAll() {
        console.log('volunteers_model_findAll');
        const [rows] = await db.query('SELECT * FROM volunteers');
        return rows;
    }

    // Busca um voluntários pelo ID
    static async findByID(id) {
        console.log('volunteers_model_findByID');
        const [rows] = await db.query('SELECT * FROM volunteers WHERE id = ?', [id]);
        return rows[0];
    }

    // Busca um voluntários pelo email
    static async findByEmail(email) {
        console.log('volunteers_model_findByEmail');
        const [rows] = await db.query('SELECT * FROM volunteers WHERE email = ?', [
            email,
        ]);
        return rows[0];
    }

    // Cria um novo voluntários
    static async create(volunteers) {
        console.log('volunteers_model_create');
        const { name, email, password, phone, role } = volunteers;
        const [result] = await db.query(
            'INSERT INTO volunteers (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, phone, role]
        );
        return result.insertId; // Retorna o ID do voluntário criado
    }

    // Atualiza um voluntário existente
    static async update(id, volunteers) {
        console.log('volunteers_model_update');
        const { name, email, password, phone, role } = volunteers;
        const [result] = await db.query(
            'UPDATE volunteers SET name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?',
            [name, email, password, phone, role, id]
        );
        return result.affectedRows; // Retorna o número de linhas afetadas
    }

    // Deleta um voluntário pelo ID
    static async delete(id) {
        console.log('volunteers_model_delete');
        const [result] = await db.query('DELETE FROM volunteers WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}

// Exporta a classe VolunteersModel para ser usada nos services
module.exports = VolunteersModel;