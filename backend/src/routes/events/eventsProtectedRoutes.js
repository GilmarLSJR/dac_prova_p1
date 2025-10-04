// Importa o framework Express
const express = require('express');

//Importa o middleware que valida tokens JWT em rotas protegidas
const {
    authenticateToken,
    authorizeRole,
} = require('../../middlewares/authMiddleware');

// Importa o controller responsável por lidar com rotas protegidas por autenticação JWT
const events_ProtectedController = require('../../controllers/events/events_ProtectedController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// Define a rota GET /admin que chama o método getAll do events_ProtectedController
router.get(
    '/getAll',
    authenticateToken,
    authorizeRole('admin'),
    events_ProtectedController.adminOnly_getAll
);

// Define a rota GET /admin que chama o método getByID do events_ProtectedController
router.get(
    '/getByID/:id',
    authenticateToken,
    authorizeRole('admin'),
    events_ProtectedController.adminOnly_getByID
);

// Define a rota POST /admin que chama o método post do events_ProtectedController
router.post(
    '/post',
    authenticateToken,
    authorizeRole('adopter'),
    events_ProtectedController.create
);

// Exporta o roteador configurado para ser utilizado na aplicação
module.exports = router;