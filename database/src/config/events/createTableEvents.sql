-- Usa o banco de dados
USE volunteering_db;

-- Cria a tabela de eventos
CREATE TABLE IF NOT EXISTS events (
id INT AUTO_INCREMENT PRIMARY KEY,
event_name VARCHAR(100) NOT NULL,
event_description VARCHAR(200) NOT NULL,
max_volunteers INT NOT NULL,
event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);