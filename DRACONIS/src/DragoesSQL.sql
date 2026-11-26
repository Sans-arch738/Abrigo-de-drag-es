CREATE DATABASE IF NOT EXISTS draconis;

USE draconis;

CREATE TABLE IF NOT EXISTS dragoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    porte ENUM('Pequeno', 'Médio', 'Grande') NOT NULL,
    sexo ENUM('Macho', 'Fêmea') NOT NULL,
    idadeEstimada INT NOT NULL,
    dataResgate DATE NOT NULL,
    dadosResgate TEXT NOT NULL,
    situacao ENUM(
        'Em tratamento',
        'Disponível para adoção',
        'Adotado'
    ) NOT NULL
);
