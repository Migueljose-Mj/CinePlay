const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const pagination = document.getElementById('pagination');
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const currentPageSpan = document.getElementById('currentPage');

// Elementos do Modal
const modal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');
const closeButton = document.querySelector('.close-button');


let searchTerm = '';
let currentPage = 1;
let totalResults = 0;

// Função para exibir uma seleção inicial de filmes populares
async function displayInitialMovies() {
    resultsContainer.innerHTML = '<p class="placeholder-message">Carregando filmes populares...</p>';
    pagination.classList.add('hidden');

    try {
        // Chama o nosso próprio backend, que vai buscar os filmes em segurança
        const response = await fetch('/api/featured');
        const moviesData = await response.json();

        if (response.ok && moviesData.length > 0) {
            displayResults(moviesData); // Reutiliza a função de exibir resultados
        } else {
            const error = moviesData.error || 'Não foi possível carregar a seleção inicial de filmes.';
            resultsContainer.innerHTML = `<p class="error-message">${error}</p>`;
        }

    } catch (error) {
        console.error('Erro ao buscar filmes iniciais:', error);
        resultsContainer.innerHTML = '<p class="error-message">Ocorreu um erro de comunicação com o servidor. Tente novamente mais tarde.</p>';
    }
}

// Função para buscar filmes/séries na API
async function searchMovies(page = 1) {
    searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        resultsContainer.innerHTML = '<p class="placeholder-message">Por favor, digite o nome de um filme ou série.</p>';
        pagination.classList.add('hidden');
        return;
    }

    try {
        resultsContainer.innerHTML = '<p class="placeholder-message">Buscando...</p>';
        pagination.classList.add('hidden');

        // Chama a rota de busca do nosso backend
        const response = await fetch(`/api/search?s=${searchTerm}&page=${page}`);
        const data = await response.json();

        if (response.ok && data.Response === 'True') {
            displayResults(data.Search);
            totalResults = parseInt(data.totalResults);
            currentPage = page;
            updatePagination();
            pagination.classList.remove('hidden');
        } else {
            const error = data.Error || `Nenhum resultado encontrado para "${searchTerm}".`;
            resultsContainer.innerHTML = `<p class="error-message">${error}</p>`;
            pagination.classList.add('hidden');
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        resultsContainer.innerHTML = '<p class="error-message">Ocorreu um erro de comunicação com o servidor. Tente novamente mais tarde.</p>';
        pagination.classList.add('hidden');
    }
}

// Função para exibir os resultados na tela
function displayResults(movies) {
    resultsContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.imdbid = movie.imdbID; // Adiciona o ID do filme para busca de detalhes

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Poster+N/A';

        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year} - ${movie.Type === 'movie' ? 'Filme' : 'Série'}</p>
        `;

        movieCard.addEventListener('click', () => openModalWithMovieDetails(movie.imdbID));
        resultsContainer.appendChild(movieCard);
    });
}

// Função para buscar detalhes e abrir o modal
async function openModalWithMovieDetails(imdbID) {
    try {
        modalBody.innerHTML = '<p>Carregando detalhes...</p>';
        modal.style.display = 'block';

        // Chama a rota de detalhes do nosso backend
        const response = await fetch(`/api/details?i=${imdbID}`);
        const details = await response.json();

        if (response.ok && details.Response === 'True') {
            const posterUrl = details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x450?text=Poster+N/A';
            modalBody.innerHTML = `
                <img src="${posterUrl}" alt="${details.Title} Poster" class="modal-poster">
                <div class="modal-details">
                    <h2>${details.Title} (${details.Year})</h2>
                    <p><strong>Avaliação:</strong> ${details.imdbRating} ⭐</p>
                    <p><strong>Gênero:</strong> ${details.Genre}</p>
                    <p><strong>Diretor:</strong> ${details.Director}</p>
                    <p><strong>Atores:</strong> ${details.Actors}</p>
                    <p><strong>Enredo:</strong> ${details.Plot}</p>
                </div>
            `;
        } else {
            const error = details.Error || 'Não foi possível carregar os detalhes.';
            modalBody.innerHTML = `<p class="error-message">${error}</p>`;
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        modalBody.innerHTML = '<p class="error-message">Ocorreu um erro de comunicação com o servidor.</p>';
    }
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
    modalBody.innerHTML = ''; // Limpa o conteúdo ao fechar
}

// Função para atualizar os botões de paginação
function updatePagination() {
    const totalPages = Math.ceil(totalResults / 10);

    currentPageSpan.textContent = `Página ${currentPage} de ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage >= totalPages;
}

// Event Listeners
searchButton.addEventListener('click', () => searchMovies(1));
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchMovies(1);
    }
});
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        searchMovies(currentPage - 1);
    }
});
nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(totalResults / 10);
    if (currentPage < totalPages) {
        searchMovies(currentPage + 1);
    }
});

closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Mensagem inicial
document.addEventListener('DOMContentLoaded', () => {
    displayInitialMovies();
});