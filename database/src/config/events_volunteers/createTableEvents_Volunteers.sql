-- Usa o banco de dados
USE volunteering_db;

-- Cria a tabela de eventos
CREATE TABLE IF NOT EXISTS events_volunteers (
id INT AUTO_INCREMENT PRIMARY KEY,
event_id INT NOT NULL UNIQUE,
volunteer_id INT NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (event_id) REFERENCES events (id),
FOREIGN KEY (volunteer_id) REFERENCES volunteers (id)
);