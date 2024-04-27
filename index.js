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
    port: 5432, //7007
});

app.use(express.json());

let sangue = ['puro', 'mestiço', 'trouxa'];

function statusSangue(status) {
    if (!sangue.includes(status)) {
        return 'Status de sangue inválido. Os valores permitidos são puro, mestiço ou trouxa.';
    }
    return '';
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
        const erroStatus = statusSangue(status);
        if (erroStatus) {
            return res.status(400).send({ mensagem: erroStatus });
        }

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

/*app.get('/bruxos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        res.status(200).send({mensagem: `Bruxo encontrado com sucesso`});
    } catch (error) {
        console.error('Erro ao obter bruxo por id', error);
        res.status(500).send({mensagem: 'Erro ao obter bruxo por id'})
    }
});*/

app.get('/bruxos/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
        if (resultado.rowCount === 0) {
            res.status(404).send({mensagem: 'Bruxo não encontrado'});
        } else {
            res.status(200).json({
                total: resultado.rowCount,
                bruxos: resultado.rows
            });
        }
    } catch (error) {
        console.error('Erro ao obter bruxo por nome', error);
        res.status(500).send({mensagem: 'Erro ao obter bruxo por nome'})
    }
});




app.get('/varinhas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todas as varinhas', error);
        res.status(500).send({mensagem: 'Erro ao obter todas as varinhas'})
    }
});

app.post('/varinhas', async(req, res) => {
    try {
        const {material, comprimento, nucleo, fabricacao}  = req.body;

        await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, fabricacao]);
        res.status(201).send({mensagem: 'Sucesso ao criar varinha'});
    } catch (error) {
        console.error('Erro ao criar varinha', error);
        res.status(500).send({mensagem: 'Erro ao criar varinha'})
    }
});

app.delete('/varinhas/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Varinha deletada'});
    } catch (error) {
        console.error('Erro ao deletar varinha', error);
        res.status(500).send({mensagem: 'Erro ao deletar varinha'})
    }
});

app.put('/varinhas/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const {material, comprimento, nucleo, fabricacao}  = req.body;

        await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucelo = $3, fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, fabricacao, id]);
        res.status(200).send({mensagem: 'Varinha editada com sucesso'})
    } catch (error) {
        console.error('Erro ao editar a varinha', error);
        res.status(500).send({mensagem: 'Erro ao editar a varinha'})
    }
})

app.get('/varinhas/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        res.status(200).send({mensagem: `Varinha com o ID ${id} encontrada com sucesso`});
    } catch (error) {
        console.error('Erro ao obter varinha por id', error);
        res.status(500).send({mensagem: 'Erro ao obter varinha por id'})
    }
});

app.get('/', (req, res) => {
    res.send('Servidor está funcionando');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
