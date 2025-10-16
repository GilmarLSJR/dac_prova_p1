// Importa a conexão pool com o banco de dados
const db = require('../config/database');

class EventsModel {
  // Busca todos os eventos
  static async findAll() {
    console.log('events_model_findAll');
    const [rows] = await db.query('SELECT * FROM events');
    return rows;
  }

  // Busca um evento pelo ID
  static async findByID(id) {
    console.log('events_model_findByID');
    const [rows] = await db.query(
      `SELECT
      events.id AS event_id,
      events.event_name AS event_name,
      events.event_date AS event_date,
      FROM events
      WHERE events.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Cria um novo evento
  static async create(event) {
    console.log('events_model_create');
    const { event_name, event_description, max_volunteers, event_date } = event;
    const [result] = await db.query(
      `INSERT INTO events (event_name, event_description, max_volunteers, event_date)
       VALUES (?, ?, ?, ?)`,
      [event_name, event_description, max_volunteers, event_date]
    );
    return result.insertId; // Retorna o ID do evento criado
  }

  // Atualiza um evento existente
  static async update(id, event) {
    console.log('events_model_update');
    const { volunteer_id, event_name, event_date } = event;
    const [result] = await db.query(
      'UPDATE events SET volunteer_id = ?, event_name = ?, event_date = ? WHERE id = ?',
      [volunteer_id, event_name, event_date, id]
    );
    return result.affectedRows; // Retorna o número de linhas afetadas
  }

  // Deleta um evento pelo ID
  static async delete(id) {
    console.log('events_model_delete');
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
    return result.affectedRows; // Retorna o número de linhas afetadas
  }
}

// Exporta a classe EventsModel para ser usada nos services
module.exports = EventsModel;
