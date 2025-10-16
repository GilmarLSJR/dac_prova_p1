// Importa o framework Express
const express = require('express');

// Importa o middleware que valida tokens JWT em rotas protegidas
const {
  authenticateToken,
  authorizeRole,
} = require('../../middlewares/authMiddleware');

// Importa o controller responsável por lidar com eventos acessíveis a voluntários
const events_volunteersProtectedController = require('../../controllers/events_volunteers/events_volunteersProtectedController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// Rota para listar todos os eventos disponíveis para voluntários
router.get(
  '/getAll',
  authenticateToken,
  authorizeRole('volunteer', 'admin'), // voluntários e admins podem visualizar
  events_volunteersProtectedController.getAll
);

// Rota para buscar um evento específico pelo ID
router.get(
  '/getByID/:id',
  authenticateToken,
  authorizeRole('volunteer', 'admin'), // ambos podem consultar
  events_volunteersProtectedController.getByID
);

// Registra o voluntário autenticado em um evento
router.post(
  '/register',
  authenticateToken,
  authorizeRole('volunteer', 'admin'),
  events_volunteersProtectedController.register
);

// Exporta o roteador configurado para ser utilizado na aplicação
module.exports = router;
