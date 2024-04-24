const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lucas',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

let sangue = ['puro', 'mestiço', 'trouxa'];

function statusSangue (sangue) {
    if(!sangue.includes(sangue)) {
        
    }
}

app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os bruxos', error);
        res.status(500).send({mensagem: 'Erro ao obter todos os bruxos'})
    }
});

app.post('/bruxos', async(req, res) => {
    try {
        const {nome, idade, casa, habilidade, status, patrono}  = req.body;

        await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, status, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, status, patrono]);
        res.status(201).send({mensagem: 'Sucesso ao criar bruxo'});
    } catch (error) {
        console.error('Erro ao criar bruxo', error);
        res.status(500).send({mensagem: 'Erro ao criar bruxo'})
    }
});

app.delete('/bruxos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Bruxo deletado'});
    } catch (error) {
        console.error('Erro ao deletar bruxo', error);
        res.status(500).send({mensagem: 'Erro ao deletar bruxo'})
    }
});

app.put('/bruxos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const {nome, idade, casa, habilidade, status, patrono}  = req.body;

        await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, status, patrono, id]);
        res.status(200).send({mensagem: 'Bruxo editado com sucesso'})
    } catch (error) {
        console.error('Erro ao editar o bruxo', error);
        res.status(500).send({mensagem: 'Erro ao editar o bruxo'})
    }
})

app.get('/bruxos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: `Bruxo com o nome ${nome} encontrado com sucesso`});
    } catch (error) {
        console.error('Erro ao obter bruxo por id', error);
        res.status(500).send({mensagem: 'Erro ao obter bruxo por id'})
    }
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});