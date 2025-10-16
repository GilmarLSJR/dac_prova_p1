// Importa a conexão pool com o banco de dados
const db = require('../config/database');

class EventsVolunteersModel {
  // Verifica se o voluntário já está inscrito em um evento específico
  static async findByEventAndVolunteer(event_id, volunteer_id) {
    console.log('events_volunteers_model_findByEventAndVolunteer');
    const [rows] = await db.query(
      `SELECT * FROM events_volunteers
       WHERE event_id = ? AND volunteer_id = ?`,
      [event_id, volunteer_id]
    );
    return rows;
  }

  // Inscreve um voluntário em um evento
  static async create(event_id, volunteer_id) {
    console.log('events_volunteers_model_create');
    const [result] = await db.query(
      `INSERT INTO events_volunteers (event_id, volunteer_id)
       VALUES (?, ?)`,
      [event_id, volunteer_id]
    );
    return result.insertId; // Retorna o ID da nova inscrição (se houver PK autoincrement)
  }
}

// Exporta a classe para uso no service
module.exports = EventsVolunteersModel;
