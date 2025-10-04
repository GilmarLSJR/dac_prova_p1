// Importa o framework Express, utilizado para criar o servidor HTTP e gerenciar rotas
const express = require('express');

// Importa o middleware Morgan para registrar as requisições HTTP no terminal (útil para depuração e monitoramento)
const morgan = require('morgan');

// Importa o middleware que permite o compartilhamento de recursos entre diferentes origens (Cross-Origin Resource Sharing)
const cors = require('cors');

// Importa o middleware de segurança que adiciona cabeçalhos HTTP para proteger contra ataques comuns
const helmet = require('helmet');

// Importa as rotas relacionadas aos eventos - Public
const eventsProtectedRoutes = require('./routes/events/eventsProtectedRoutes');

// // Importa as rotas relacionadas aos eventos - Public
// const events_PublicRoutes = require('./routes/events/events_PublicRoutes');

// Importa as rotas relacionadas aos voluntários - Protected
const volunteersProtectedRoutes = require('./routes/volunteers/volunteersProtectedRoutes');

// Importa as rotas relacionadas aos voluntários - Public
const volunteersPublicRoutes = require('./routes/volunteers/volunteersPublicRoutes');

// Importa as rotas relacionadas aos usuários - Protected
const usersProtectedRoutes = require('./routes/users/usersProtectedRoutes');

// Importa as rotas relacionadas aos usuários - Public
const usersPublicRoutes = require('./routes/users/usersPublicRoutes');

// Importa o middleware para tratamento de erros relacionado as adoções
const events_ErrorMiddleware = require('./middlewares/events_ErrorMiddleware');

// Importa o middleware para tratamento de erros relacionado aos pets
const volunteers_ErrorMiddleware = require('./middlewares/volunteers_ErrorMiddleware');

// Importa o middleware para tratamento de erros relacionado aos usuários
const users_ErrorMiddleware = require('./middlewares/users_ErrorMiddleware');

// // Importa o middleware para tratamento de erros genéricos
// const errorMiddleware = require('./middlewares/errorMiddleware');

// Cria uma instância do aplicativo Express
const app = express();

// Middlewares globais
// Usa o morgan com o formato 'dev' (colorido e resumido)
app.use(morgan('dev'));

// Habilita o CORS em todas as rotas da aplicação
app.use(cors());

// Adiciona proteção automática contra vulnerabilidades HTTP
app.use(helmet());

// Permite que o servidor interprete requisições com corpo em formato JSON
app.use(express.json());

// Rotas da aplicação
// Define que todas as requisições iniciadas com /events/protected serão encaminhadas para o arquivo adoptions_ProtectedRoutes
app.use('/events/protected', eventsProtectedRoutes);

// // Define que todas as requisições iniciadas com /events/public serão encaminhadas para o arquivo adoptions_PublicRoutes
// app.use('/events/public', events_PublicRoutes);

// Define que todas as requisições iniciadas com /volunteers/protected serão encaminhadas para o arquivo pets_ProtectedRoutes
app.use('/volunteers/protected', volunteersProtectedRoutes);

// Define que todas as requisições iniciadas com /volunteers/public serão encaminhadas para o arquivo pets_PublicRoutes
app.use('/volunteers/public', volunteersPublicRoutes);

// Define que todas as requisições iniciadas com /users/protected serão encaminhadas para o arquivo user_ProtectedRoutes
app.use('/users/protected', usersProtectedRoutes);

// Define que todas as requisições iniciadas com /users/public serão encaminhadas para o arquivo user_PublicRoutes
app.use('/users/public', usersPublicRoutes);

// Middleware de tratamento de erros (deve ser adicionado depois das rotas)
// Middleware que captura e trata erros, enviando respostas ao cliente - Relacionado aos events
app.use(events_ErrorMiddleware);

// Middleware que captura e trata erros, enviando respostas ao cliente - Relacionado aos voluntários
app.use(volunteers_ErrorMiddleware);

// Middleware que captura e trata erros, enviando respostas ao cliente - Relacionado aos usuários
app.use(users_ErrorMiddleware);

// // Middleware que captura e trata erros, enviando respostas ao cliente - Genérico
// // Esse middleware captura qualquer erro não tratado pelos middlewares anteriores
// app.use(errorMiddleware);

// Exporta a aplicação configurada para ser utilizada pelo servidor (server.js)
module.exports = app;