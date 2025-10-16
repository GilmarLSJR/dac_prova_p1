-- Usa o banco de dados
USE volunteering_db;

-- Insere dois tipos de usuários
INSERT INTO
    events (event_name, event_description, max_volunteers)
VALUES
    (
        'Doação de sangue',
        'Doação de sangue no hospital ADS',
        10
    ),
    (
        'Limpeza do parque',
        'Limpaza do parque do campus IFRS BG',
        20
    );