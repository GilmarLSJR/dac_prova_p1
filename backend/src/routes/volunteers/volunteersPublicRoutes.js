// Importa o framework Express
const express = require('express');

// Importa o controller responsável por gerenciar as ações de voluntário
const volunteersPublicController = require('../../controllers/volunteers/volunteersPublicController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// Define a rota para criar um novo usuário
router.post('/create', volunteersPublicController.create);

// Define a rota para login de um usuário
router.post('/login', volunteersPublicController.login);

module.exports = router; // Exporta o roteador configurado para ser usado no app principal
