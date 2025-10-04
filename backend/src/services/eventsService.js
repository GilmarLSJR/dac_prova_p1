// Importa o Model responsável pelo acesso ao banco de dados (tabela events)
const eventsModel = require('../models/eventsModel');

// Importa o Model responsável pelo acesso ao banco de dados (tabela users)
const usersModel = require('../models/usersModel');

class EventsService {

  // Busca todos eventos cadastrados
  static async getAll() {
    console.log('events_service_getAll');
    return await EventsModel.findAll();
  }

  // Busca os eventos cadastrados pelo ID
  static async getByID(id) {
    console.log('events_service_getByID');
    const getByID = await EventsModel.findByID(id);
    if (!getByID) {
      throw new Error('Evento não encontrado.'); // Caso nenhum evento tenha sido encontrado
    }
    return getByID;
  }

  // Cria um novo evento após validações
  static async create(adoption) {
    console.log('events_service_create');
    //////////
    //////////
    //////////
    //////////
    //////////
    // Verifica condições do pet antes de fazer a adoção
    const pet = await PetsModel.findByID(adoption.pet_id);
    if (!pet) {
      throw new Error('Pet não encontrado'); // Erro se não encontrar o pet
    }

    if (pet.status !== 'available') {
      throw new Error('Pet não está disponível para adoção'); // Erro se o pet não está disponível
    }

    // Se estiver disponível, prossegue com a criação
    const novoEvento = await EventsModel.create(event);

    // Atualiza o status do pet para "adopted"
    await PetsModel.updateStatus(event.pet_id, 'adopted');

    return novoEvento;
  }
}

// Exporta a classe para ser utilizada pelos controllers
module.exports = EventsService;