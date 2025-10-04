// Biblioteca para criptografia de senhas
const bcrypt = require('bcryptjs');

// Biblioteca para geração de tokens JWT
const jwt = require('jsonwebtoken');

// Importa o Model responsável pelo acesso ao banco de dados (tabela users)
const UsersModel = require('../models/usersModel');

// Importa a função utilitária que valida o formato de e-mail
const validateEmail = require('../utils/validateEmail');

class UsersService {
    
    // Busca todos os usuários cadastrados
    static async getAll() {
        console.log('users_service_getAll');
        return await UsersModel.findAll();
    }

    // Busca os usuários cadastrados pelo ID
    static async getByID(id) {
        console.log('users_service_getByID');
        const getUsersByID = await UsersModel.findByID(id);
        if (!getUsersByID) {
            throw new Error('Usuário não encontrado.'); // Caso nenhum usuário tenha sido encontrado
        }
        return getUsersByID;
    }

    // Cria um novo usuário após validações
    static async create(user) {
        console.log('users_service_create');
        const { email, password } = users;

        if (!validateEmail(email)) {
            throw new Error('Formato de email inválido.'); // Verifica o formato do e-mail
        }

        const existingUsers = await UsersModel.findByEmail(email);
        if (existingUsers) {
            throw new Error('Email já cadastrado.'); // Impede cadastro de e-mails duplicados
        }
        // Criptografa a senha antes de salvar no banco
        const hashed = await bcrypt.hash(password, 10);

        // Substitui a senha original pela criptografada
        users.password = hashed;

        return await UsersModel.create(users); // Cria um novo usuário
    }

    // Atualiza informações de um usuário existente
    static async update(id, users) {
        console.log('users_service_update');
        const { email, password } = users;

        if (!validateEmail(email)) {
            throw new Error('Formato de email inválido.'); // Verifica o formato do e-mail
        }

        const existingUsers = await UsersModel.findByEmail(email);
        if (existingUsers) {
            throw new Error('Email já cadastrado.'); // Impede cadastro de e-mails duplicados
        }
        // Criptografa a senha antes de salvar no banco
        const hashed = await bcrypt.hash(password, 10);

        // Substitui a senha original pela criptografada
        users.password = hashed;

        const updatedRows = await UsersModel.update(id, users);
        if (updatedRows === 0) {
            throw new Error('Usuário não encontrado.'); // Caso nenhum usuário tenha sido atualizado
        }
        return updatedRows;
    }

    // Deleta um usuário pelo ID static
    static async delete(id) {
        console.log('users_service_delete');
        const deletedRows = await UsersModel.delete(id);
        if (deletedRows === 0) {
            throw new Error('Usuário não encontrado.'); // Caso nenhum usuário tenha sido deletado
        }
        return deletedRows;
    }

    // Método para autenticar o usuário e gerar token JWT
    static async login({ email, password }) {
        console.log('users_service_login');
        // Verifica o formato do e-mail
        if (!validateEmail(email)) {
            throw new Error('Formato de email inválido.');
        }

        // Busca o usuário pelo e-mail
        const users = await UsersModel.findByEmail(email);
        if (!users) {
            throw new Error('Usuário não encontrado');
        }

        // Verifica se a senha fornecida é válida
        const valid = await bcrypt.compare(password, users.password);
        if (!valid) {
            throw new Error('Senha inválida');
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: users.id, email: users.email, role: users.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna o token para o controller
        return { token };
    }
}

// Exporta a classe para ser utilizada pelos controllers
module.exports = UsersService;