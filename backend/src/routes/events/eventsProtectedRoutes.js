// Importa o framework Express
const express = require('express');

//Importa o middleware que valida tokens JWT em rotas protegidas
const {
  authenticateToken,
  authorizeRole,
} = require('../../middlewares/authMiddleware');

// Importa o controller responsável por lidar com rotas protegidas por autenticação JWT
const eventsProtectedController = require('../../controllers/events/eventsProtectedController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// Define a rota GET /admin que chama o método getAll do events_ProtectedController
router.get(
  '/getAll',
  authenticateToken,
  authorizeRole('admin', 'volunteer'),
  eventsProtectedController.adminOnly_getAll
);

// Define a rota GET que chama o método getAll do events_ProtectedController
router.get('/getAllPublic', eventsProtectedController.getAllPublic);

// Define a rota GET /admin que chama o método getByID do events_ProtectedController
router.get(
  '/getByID/:id',
  authenticateToken,
  authorizeRole('admin'),
  eventsProtectedController.adminOnly_getByID
);

// Define a rota POST /admin que chama o método post do events_ProtectedController
router.post(
  '/post',
  authenticateToken,
  authorizeRole('admin'),
  eventsProtectedController.create
);

// Define a rota PUT /admin que chama o método update do events_ProtectedController
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRole('admin'),
  eventsProtectedController.update
);

// Define a rota DELETE /admin que chama o método update do events_ProtectedController
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRole('admin'),
  eventsProtectedController.adminOnly_delete
);

// Exporta o roteador configurado para ser utilizado na aplicação
module.exports = router;
