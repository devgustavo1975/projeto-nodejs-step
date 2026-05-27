const express = require('express');

const app = express();

app.use(express.json());

let usuarios = [
  {
    id: 1,
    nome: 'João',
    email: 'joao@email.com'
  },
  {
    id: 2,
    nome: 'Maria',
    email: 'maria@email.com'
  }
];

// GET - Listar usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// POST - Adicionar usuário
app.post('/usuarios', (req, res) => {

  const { id, nome, email } = req.body;

  const novoUsuario = {
    id,
    nome,
    email
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: 'Usuário adicionado com sucesso',
    usuario: novoUsuario
  });
});

// DELETE - Remover usuário
app.delete('/usuarios/:id', (req, res) => {

  const id = parseInt(req.params.id);

  usuarios = usuarios.filter(usuario => usuario.id !== id);

  res.json({
    mensagem: 'Usuário removido com sucesso'
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});