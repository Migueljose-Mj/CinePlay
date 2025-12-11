// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
// fetch já está disponível globalmente nas versões recentes do Node.js

const app = express();
const PORT = 3000; // Porta que o servidor vai usar

// === MIDDLEWARE ===
// Habilita o CORS para permitir requisições do frontend
app.use(cors());
// Permite que o express entenda requisições com corpo em JSON
app.use(express.json());
// Serve os arquivos estáticos (html, css, js) da pasta atual
app.use(express.static(path.join(__dirname, '')));


// === CONFIGURAÇÃO DA API ===
const API_KEY = process.env.OMDB_API_KEY;
if (!API_KEY) {
    throw new Error("A chave da API OMDB (OMDB_API_KEY) não foi encontrada no arquivo .env");
}
const OMDB_BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;


// === ROTAS DA API DO NOSSO SERVIDOR ===

// Rota para a busca principal
app.get('/api/search', async (req, res) => {
    const { s, page } = req.query; // s = termo de busca, page = página
    if (!s) {
        return res.status(400).json({ error: 'O termo de busca (s) é obrigatório.' });
    }
    try {
        const apiResponse = await fetch(`${OMDB_BASE_URL}&s=${s}&page=${page || 1}`);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Erro na rota /api/search:', error);
        res.status(500).json({ error: 'Falha ao buscar dados da API OMDb.' });
    }
});

// Rota para buscar detalhes de um filme específico
app.get('/api/details', async (req, res) => {
    const { i } = req.query; // i = IMDb ID
    if (!i) {
        return res.status(400).json({ error: 'O ID do IMDb (i) é obrigatório.' });
    }
    try {
        const apiResponse = await fetch(`${OMDB_BASE_URL}&i=${i}&plot=full`);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Erro na rota /api/details:', error);
        res.status(500).json({ error: 'Falha ao buscar detalhes da API OMDb.' });
    }
});

// Rota para os filmes em destaque na página inicial
app.get('/api/featured', async (req, res) => {
    const featuredMovies = ['Inception', 'The Dark Knight', 'Interstellar', 'The Matrix', 'Pulp Fiction', 'Forrest Gump', 'Fight Club'];
    try {
        const moviePromises = featuredMovies.map(title =>
            fetch(`${OMDB_BASE_URL}&t=${title}`).then(resp => resp.json())
        );
        const moviesData = await Promise.all(moviePromises);
        // Retorna apenas os filmes que foram encontrados com sucesso
        res.json(moviesData.filter(movie => movie.Response === 'True'));
    } catch (error) {
        console.error('Erro na rota /api/featured:', error);
        res.status(500).json({ error: 'Falha ao buscar filmes em destaque.' });
    }
});


// === INICIALIZAÇÃO DO SERVIDOR ===
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Seu explorador de filmes agora está seguro!');
    console.log('Acesse o site em http://localhost:3000 no seu navegador.');
});
