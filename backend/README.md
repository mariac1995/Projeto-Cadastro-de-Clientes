# Projeto: Cadastro de Clientes

Um sistema simples de cadastro de clientes desenvolvido com FastAPI no backend e uma interface web básica no frontend.

## Descrição

Este projeto permite o gerenciamento de clientes através de uma API RESTful construída com FastAPI. O frontend é uma aplicação web simples que interage com a API para realizar operações CRUD (Criar, Ler, Atualizar, Deletar) de clientes.

## Funcionalidades

- Listar todos os clientes
- Cadastrar novo cliente
- Atualizar informações de um cliente existente
- Deletar um cliente
- Interface web responsiva para interação

## Pré-requisitos

- Python 3.8 ou superior
- MySQL Server
- Navegador web moderno

## Instalação

1. Clone o repositório:

   ```bash
   git clone <https://github.com/mariac1995/Projeto-Cadastro-de-Clientes.git>
   cd projeto_cadastro
   ```

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure o banco de dados MySQL:
   - Crie um banco de dados chamado `sistema_clientes`
   - Execute o script SQL para criar a tabela `clientes`:
     ```sql
     CREATE TABLE clientes (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nome VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         telefone VARCHAR(20) NOT NULL
     );
     ```

4. Atualize as credenciais do banco de dados em `backend/database.py` se necessário.

## Uso

1. Inicie o servidor backend:

   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Abra o arquivo `frontend/index.html` no navegador ou sirva os arquivos do frontend através de um servidor web.

3. A API estará disponível em `http://localhost:8000` e a documentação em `http://localhost:8000/docs`.

## Endpoints da API

- `GET /` - Verifica se a API está funcionando
- `GET /clientes` - Lista todos os clientes
- `POST /clientes` - Cadastra um novo cliente
- `PUT /clientes/{id}` - Atualiza um cliente pelo ID
- `DELETE /clientes/{id}` - Deleta um cliente pelo ID

## Estrutura do Projeto

```
projeto_cadastro/
├── backend/
│   ├── main.py          # Aplicação FastAPI principal
│   └── database.py      # Configuração da conexão com MySQL
├── frontend/
│   ├── index.html       # Página principal
│   ├── script.js        # Lógica JavaScript
│   └── style.css        # Estilos CSS
├── requirements.txt     # Dependências Python
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

## Tecnologias Utilizadas

- **Backend**: FastAPI, Pydantic, MySQL Connector
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Banco de Dados**: MySQL

## Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
