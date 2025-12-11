# Meu Explorador de Filmes

Uma aplicação web simples e elegante, inspirada na Netflix, para buscar informações sobre filmes e séries utilizando a API OMDb.

**[Veja a demonstração ao vivo!] (link-para-o-seu-site-no-render-aqui)** _(Você poderá adicionar este link depois que publicarmos o site)_

---

## ✨ Funcionalidades

*   **Busca Dinâmica:** Encontre filmes e séries por título.
*   **Visualização em Grade:** Resultados exibidos em um layout de cartões moderno.
*   **Detalhes Completos:** Clique em um filme para ver informações detalhadas como enredo, avaliação, diretor e elenco em uma janela modal.
*   **Paginação:** Navegue facilmente por múltiplas páginas de resultados.
*   **Segurança:** A chave da API é protegida em um servidor backend, não ficando exposta no código do cliente.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend:**
    *   HTML5
    *   CSS3 (com Variáveis, Flexbox e Grid)
    *   JavaScript (ES6+)
*   **Backend:**
    *   Node.js
    *   Express.js
*   **API:**
    *   [OMDb API (The Open Movie Database)](https://www.omdbapi.com/)

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie o arquivo de ambiente:**
    *   Crie um arquivo chamado `.env` na raiz do projeto.
    *   Dentro dele, adicione sua chave da API OMDb:
      ```
      OMDB_API_KEY=sua_chave_aqui
      ```

4.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

---

## Agradecimentos

Este projeto utiliza dados fornecidos pela [OMDb API](https://www.omdbapi.com/).
