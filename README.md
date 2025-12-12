#  CinePlay - Explorador de Filmes e Séries 🎬

![Licença](https://img.shields.io/badge/license-ISC-blue.svg)

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

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/meu-explorador-filmes.git
    cd meu-explorador-filmes
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione sua chave da OMDb API a ele:
      ```
      OMDB_API_KEY=sua_chave_aqui
      ```

4.  **Inicie o servidor:**
    ```bash
    npm start
    ```

5.  Abra seu navegador e acesse `http://localhost:3000`.

---

## 📄 Licença

Este projeto está sob a licença ISC.

