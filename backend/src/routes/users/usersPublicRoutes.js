// Importa o framework Express
const express = require('express');

// Importa o controller responsável por gerenciar as ações de usuário
const usersPublicController = require('../../controllers/users/usersPublicController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// Define a rota para criar um novo usuário
router.post('/create', usersPublicController.create);

// Define a rota para login de um usuário
router.post('/login', usersPublicController.login);

module.exports = router; // Exporta o roteador configurado para ser usado no app principal
