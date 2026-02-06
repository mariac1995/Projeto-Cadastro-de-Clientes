from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_connection


class Cliente(BaseModel):
    nome: str
    email: str
    telefone: str


app = FastAPI()


# Permitir acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"mensagem": "API funcionando!"}

@app.get("/clientes")
def listar_clientes():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()

    conn.close()

    return clientes


# Cadastrar cliente
@app.post("/clientes")
def criar_cliente(cliente: Cliente):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO clientes (nome, email, telefone)
    VALUES (%s, %s, %s)
    """

    valores = (cliente.nome, cliente.email, cliente.telefone)

    cursor.execute(sql, valores)

    conn.commit()
    conn.close()

    return {"mensagem": "Cliente cadastrado com sucesso"}


# Atualizar cliente pelo ID
@app.put("/clientes/{id}")
def atualizar_cliente(id: int, cliente: Cliente):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE clientes
    SET nome = %s, email = %s, telefone = %s
    WHERE id = %s
    """

    valores = (cliente.nome, cliente.email, cliente.telefone, id)

    cursor.execute(sql, valores)

    conn.commit()

    linhas_afetadas = cursor.rowcount

    conn.close()

    if linhas_afetadas == 0:
        return {"erro": "Cliente não encontrado"}

    return {"mensagem": "Cliente atualizado com sucesso"}


@app.delete("/clientes/{id}")
def deletar_cliente(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM clientes WHERE id = %s", (id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    cursor.close()
    conn.close()

    return {"mensagem": "Cliente deletado com sucesso"}



