// Importa o serviço que contém a lógica de negócio para manipular voluntários
const VolunteersService = require('../../services/volunteersService');

class VolunteersProtectedController {
  // Método para listar todos os voluntários
  static async adminOnly_getAll(req, res) {
    console.log('volunteers_ProtectedController_adminOnly_getAll');
    try {
      const volunteers = await VolunteersService.getAll(); // Chama o service para buscar voluntários
      res.json(volunteers); // Retorna a lista em formato JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
    }
  }

  // Método para listar os voluntários pelo ID
  static async getByID(req, res) {
    console.log('volunteers_ProtectedController_getByID');
    try {
      const requestedID = parseInt(req.params.id); // ID passado na URL
      const requester = req.volunteers; // Extraído do token JWT no middleware authenticateToken
      console.log('Usuário autenticado via JWT:', requester);
      // Se não for admin e estiver tentando acessar outro ID, negar o acesso
      if (requester.role !== 'admin' && requester.id !== requestedID) {
        return res.status(403).json({
          error: 'Acesso negado. Você só pode acessar o seu próprio perfil.',
        });
      }

      const id = req.params.id; // Pega o ID da URL
      const volunteers = await VolunteersService.getByID(id); // Chama o service para buscar voluntários pelo ID
      return res.json(volunteers); // Retorna a lista em formato JSON
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Retorna erro se voluntário não encontrado
    }
  }

  // Método para atualizar um voluntário existente
  static async update(req, res) {
    console.log('volunteers_ProtectedController_update');
    try {
      const requestedID = parseInt(req.params.id); // ID passado na URL
      const requester = req.volunteers; // Extraído do token JWT no middleware authenticateToken
      console.log('Usuário autenticado via JWT:', requester);
      // Se não for admin e estiver tentando acessar outro ID, negar o acesso
      if (requester.role !== 'admin' && requester.id !== requestedID) {
        return res.status(403).json({
          error: 'Acesso negado. Você só pode acessar o seu próprio perfil.',
        });
      }
      const id = req.params.id; // Pega o ID da URL
      await VolunteersService.update(id, req.body); // Chama o service para atualizar
      return res.json({ message: 'Voluntário atualizado com sucesso.' });
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Retorna erro se não encontrar ou problema nos dados
    }
  }

  // Método para deletar um voluntário
  static async adminOnly_delete(req, res) {
    console.log('volunteers_ProtectedController_adminOnly_update');
    try {
      const id = req.params.id; // Pega o ID da URL
      await VolunteersService.delete(id); // Chama o service para deletar
      res.json({ message: 'Voluntário deletado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se voluntário não encontrado
    }
  }
}

// Exporta o Controller para ser usado nas rotas
module.exports = VolunteersProtectedController;
