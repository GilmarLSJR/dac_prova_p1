// Biblioteca para criptografia de senhas
const bcrypt = require('bcryptjs');

// Biblioteca para geração de tokens JWT
const jwt = require('jsonwebtoken');

// Importa o Model responsável pelo acesso ao banco de dados (tabela volunteers)
const VolunteersModel = require('../models/volunteersModel');

// Importa a função utilitária que valida o formato de e-mail
const validateEmail = require('../utils/validateEmail');

class VolunteersService {
  // Busca todos os voluntários cadastrados
  static async getAll() {
    console.log('volunteers_service_getAll');
    return await VolunteersModel.findAll();
  }

  // Busca os voluntários cadastrados pelo ID
  static async getByID(id) {
    console.log('volunteers_service_getByID');
    const getUsersByID = await VolunteersModel.findByID(id);
    if (!getUsersByID) {
      throw new Error('Voluntário não encontrado.'); // Caso nenhum voluntário tenha sido encontrado
    }
    return getUsersByID;
  }

  // Cria um novo voluntário após validações
  static async create(volunteers) {
    console.log('volunteers_service_create');
    const { email, password } = volunteers;

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.'); // Verifica o formato do e-mail
    }

    const existingVolunteers = await VolunteersModel.findByEmail(email);
    if (existingVolunteers) {
      throw new Error('Email já cadastrado.'); // Impede cadastro de e-mails duplicados
    }
    // Criptografa a senha antes de salvar no banco
    const hashed = await bcrypt.hash(password, 10);

    // Substitui a senha original pela criptografada
    volunteers.password = hashed;

    return await VolunteersModel.create(volunteers); // Cria um novo voluntário
  }

  // Atualiza informações de um voluntário existente
  static async update(id, volunteers) {
    console.log('volunteers_service_update');
    const { email, password } = volunteers;

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.'); // Verifica o formato do e-mail
    }

    const existingVolunteers = await VolunteersModel.findByEmail(email);
    if (existingVolunteers) {
      throw new Error('Email já cadastrado.'); // Impede cadastro de e-mails duplicados
    }
    // Criptografa a senha antes de salvar no banco
    const hashed = await bcrypt.hash(password, 10);

    // Substitui a senha original pela criptografada
    volunteers.password = hashed;

    const updatedRows = await VolunteersModel.update(id, volunteers);
    if (updatedRows === 0) {
      throw new Error('Voluntário não encontrado.'); // Caso nenhum voluntário tenha sido atualizado
    }
    return updatedRows;
  }

  // Deleta um voluntário pelo ID
  static async delete(id) {
    console.log('volunteers_service_delete');
    const deletedRows = await VolunteersModel.delete(id);
    if (deletedRows === 0) {
      throw new Error('Voluntário não encontrado.'); // Caso nenhum voluntário tenha sido deletado
    }
    return deletedRows;
  }

  // Método para autenticar o usuário e gerar token JWT
  static async login({ email, password }) {
    console.log('volunteers_service_login');
    // Verifica o formato do e-mail
    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.');
    }

    // Busca o usuário pelo e-mail
    const volunteers = await VolunteersModel.findByEmail(email);
    if (!volunteers) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(password, volunteers.password);
    if (!valid) {
      throw new Error('Senha inválida');
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: volunteers.id, email: volunteers.email, role: volunteers.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token para o controller
    return { token };
  }
}

// Exporta a classe para ser utilizada pelos controllers
module.exports = VolunteersService;
