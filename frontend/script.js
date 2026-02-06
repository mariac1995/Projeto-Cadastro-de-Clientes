const API_URL = "http://127.0.0.1:8000";

let idEditando = null;


// ============================
// CARREGAR CLIENTES
// ============================
async function carregarClientes() {

  const resposta = await fetch(`${API_URL}/clientes`);

  const clientes = await resposta.json();

  const lista = document.getElementById("lista");

  lista.innerHTML = "";


  clientes.forEach(cliente => {

    const li = document.createElement("li");


    li.innerHTML = `

      <span>
        ${cliente.nome} | ${cliente.email} | ${cliente.telefone}
      </span>

      <div class="acoes">

        <button onclick="editarCliente(${cliente.id})">
          Editar
        </button>

        <button class="btn-delete"
          onclick="deletarCliente(${cliente.id})">
          Excluir
        </button>

      </div>

    `;


    lista.appendChild(li);

  });

}


// ============================
// SALVAR / ATUALIZAR
// ============================
async function salvarCliente(event) {

  event.preventDefault();


  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;


  const dados = {
    nome,
    email,
    telefone
  };


  // UPDATE
  if (idEditando !== null) {

    await fetch(`${API_URL}/clientes/${idEditando}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(dados)

    });


    idEditando = null;

    document.getElementById("btnSalvar").innerText = "Cadastrar";

  }

  // CREATE
  else {

    await fetch(`${API_URL}/clientes`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(dados)

    });

  }


  limparFormulario();
  carregarClientes();

}


// ============================
// EDITAR
// ============================
async function editarCliente(id) {

  const resposta = await fetch(`${API_URL}/clientes`);

  const clientes = await resposta.json();


  const cliente = clientes.find(c => c.id === id);


  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefone").value = cliente.telefone;


  idEditando = id;


  document.getElementById("btnSalvar").innerText = "Atualizar";

}


// ============================
// DELETAR
// ============================
async function deletarCliente(id) {

  if (!confirm("Deseja excluir este cliente?")) return;


  await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE"
  });


  carregarClientes();

}


// ============================
// LIMPAR
// ============================
function limparFormulario() {

  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";

}


// ============================
// INICIAR
// ============================
carregarClientes();
