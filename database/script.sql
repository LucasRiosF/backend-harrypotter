CREATE DATABASE lucas;

\c lucas;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(50) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(50) NOT NULL,
    comprimento DECIMAL NOT NULL,
    nucleo VARCHAR(50) NOT NULL,
    frabricacao DATE NOT NULL
);