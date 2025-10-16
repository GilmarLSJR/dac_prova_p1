// Importa o Model responsável pelo acesso ao banco de dados (tabela events_volunteers)
const EventsVolunteersModel = require('../models/events_volunteersModel');

class EventsVolunteersService {
  // Registra um voluntário em um evento
  static async registerVolunteer(event_id, volunteer_id) {
    console.log('events_volunteers_service_registerVolunteer');

    // Validações básicas
    if (!event_id || !volunteer_id) {
      throw new Error('event_id e volunteer_id são obrigatórios.');
    }

    // Verifica se já existe inscrição
    const existing = await EventsVolunteersModel.findByEventAndVolunteer(
      event_id,
      volunteer_id
    );
    if (existing.length > 0) {
      throw new Error('Voluntário já está inscrito neste evento.');
    }

    // Cria nova inscrição
    const newRegistration = await EventsVolunteersModel.create(
      event_id,
      volunteer_id
    );

    return {
      message: 'Inscrição realizada com sucesso!',
      insertId: newRegistration,
    };
  }
}

// Exporta a classe para ser usada pelo controller
module.exports = EventsVolunteersService;
