// Biblioteca para criptografia de senhas
const bcrypt = require('bcryptjs');

// Importa o Model responsável pelo acesso ao banco de dados (tabela events)
const EventsModel = require('../models/eventsModel');

// // Importa o Model responsável pelo acesso ao banco de dados (tabela users)
// const UsersModel = require('../models/usersModel');

// Importa a função utilitária que valida o formato de e-mail
const validateEmail = require('../utils/validateEmail');

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
  static async create(event) {
    console.log('events_service_create');

    // Se estiver disponível, prossegue com a criação
    const novoEvento = await EventsModel.create(event);

    return novoEvento;
  }

  // Atualiza informações de um evento existente
  static async update(id, users) {
    console.log('events_service_update');
    const { email, password } = users;

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.'); // Verifica o formato do e-mail
    }

    const existingUsers = await EventsModel.findByEmail(email);
    if (existingUsers) {
      throw new Error('Email já cadastrado.'); // Impede cadastro de e-mails duplicados
    }
    // Criptografa a senha antes de salvar no banco
    const hashed = await bcrypt.hash(password, 10);

    // Substitui a senha original pela criptografada
    users.password = hashed;

    const updatedRows = await EventsModel.update(id, users);
    if (updatedRows === 0) {
      throw new Error('Evento não encontrado.'); // Caso nenhum evento tenha sido atualizado
    }
    return updatedRows;
  }

  // Deleta um evento pelo ID
  static async delete(id) {
    console.log('events_service_delete');
    const deletedRows = await EventsModel.delete(id);
    if (deletedRows === 0) {
      throw new Error('Evento não encontrado.'); // Caso nenhum evento tenha sido deletado
    }
    return deletedRows;
  }
}

// Exporta a classe para ser utilizada pelos controllers
module.exports = EventsService;
