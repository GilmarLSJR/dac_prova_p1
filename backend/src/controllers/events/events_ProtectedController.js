// Importa o serviço que contém a lógica de negócio para manipular eventos
const EventsService = require('../../services/eventsService');

class Events_ProtectedController {

    // Método para listar todos os eventos
    static async adminOnly_getAll(req, res) {
        console.log('events_ProtectedController_getAll');
        try {
            const events = await EventsService.getAll(); // Chama o service para buscar eventos
            res.json(events); // Retorna a lista em formato JSON
        } catch (error) {
            res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500 (erro interno)
        }
    }

    // Método para listar os eventos pelo ID
    static async adminOnly_getByID(req, res) {
        console.log('events_ProtectedController_adminOnly_getByID');
        try {
            const id = req.params.id; // Pega o ID da URL
            const events = await EventsService.getByID(id); // Chama o service para buscar eventos pelo ID
            res.json(events); // Retorna a lista em formato JSON
        } catch (error) {
            res.status(400).json({ error: error.message }); // Retorna erro se et não encontrado
        }
    }

    // Método para criar um novo evento
    static async create(req, res) {
        console.log('events_ProtectedController_create');
        try {
            const id = await EventsService.create(req.body); // Chama o service para criar eventos
            res.status(201).json({ message: 'Evento criado com sucesso.', id }); // Retorna status 201 (criado) e o ID
        } catch (error) {
            res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
        }
    }
}

// Exporta o Controller para ser usado nas rotas
module.exports = Events_ProtectedController;