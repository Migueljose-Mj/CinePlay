# CinePlay - Explorador de Filmes e Séries 🎬

Um explorador de conteúdo audiovisual que permite aos usuários pesquisar filmes e séries, além de visualizar seus detalhes. O projeto utiliza um backend em Node.js para proteger a chave da API do OMDb, garantindo que ela não seja exposta no lado do cliente.

---

## 🚀 Deploy

A aplicação está no ar e pode ser acessada através do seguinte link:

**[https://cineplay-j3ly.onrender.com](https://cineplay-j3ly.onrender.com)**

---

## ✨ Funcionalidades Principais

- **Busca Abrangente:** Pesquise filmes e séries por título.
- **Detalhes Completos:** Clique em um item para ver informações detalhadas, como enredo, diretor, elenco e avaliação.
- **Conteúdo em Destaque:** A página inicial exibe uma lista de filmes populares pré-selecionados.
- **Backend Seguro:** Um servidor Express atua como um proxy seguro, fazendo as requisições para a API OMDb e protegendo a chave de acesso.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Dotenv](https://www.npmjs.com/package/dotenv) para gerenciamento de variáveis de ambiente.
  - [CORS](https://www.npmjs.com/package/cors) para habilitar requisições de diferentes origens.
- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (com `fetch` para requisições à API)
- **API Externa:**
  - OMDb API
- **Hospedagem:**
  - Render

