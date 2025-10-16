// Importa o framework Express
const express = require('express');

//Importa o middleware que valida tokens JWT em rotas protegidas
const {
  authenticateToken,
  authorizeRole,
} = require('../../middlewares/authMiddleware');

// Importa o controller responsável por lidar com rotas protegidas por autenticação JWT
const usersProtectedController = require('../../controllers/users/usersProtectedController');

// Cria uma nova instância de roteador do Express
const router = express.Router();

// // Define a rota GET /dashboard que chama o método dashboard do users_ProtectedController
// router.get('/dashboard', authenticateToken, users_ProtectedController.dashboard);

// Define a rota GET /admin que chama o método getAll do users_ProtectedController
router.get(
  '/getAll',
  authenticateToken,
  authorizeRole('admin'),
  usersProtectedController.adminOnly_getAll
);

// Define a rota GET /admin que chama o método getByID do users_ProtectedController
router.get(
  '/getByID/:id',
  authenticateToken,
  authorizeRole('admin', 'volunteer'),
  usersProtectedController.getByID
);

// Define a rota PUT /admin que chama o método update do users_ProtectedController
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRole('admin'),
  usersProtectedController.update
);

// Define a rota DELETE /admin que chama o método update do users_ProtectedController
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRole('admin'),
  usersProtectedController.adminOnly_delete
);

// Exporta o roteador configurado para ser utilizado na aplicação
module.exports = router;
