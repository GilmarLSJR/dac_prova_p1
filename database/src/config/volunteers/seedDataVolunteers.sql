-- Usa o banco de dados
USE volunteering_db;

-- Insere dois tipos de usuários
INSERT INTO
    volunteers (name, email, password, phone)
VALUES
    (
        'volunteer_1',
        'volunteer_1@ifrs.edu.br',
        '$2b$10$382cEJJYi5YxSBNvWmufHeoPHX3dqIB9NP2R2XWzt/w.DnC0gmCr2',
        '54991090329'
    ),
    (
        'volunteer_2',
        'volunteer_2@ifrs.edu.br',
        '$2b$10$/JLXJ62EBlk1bNq0xmpvMuTLDJb6AWmZUs74lgEJb4Z.J9.3kFJM.',
        '54996821107'
    );