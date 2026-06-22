const notificador = require('../services/notificador');

const register = async (req, res) => {
  const { nome, email, telefone } = req.body;

  // lógica de cadastro

  notificador.enviarEmail(
    email,
    'Cadastro realizado',
    `Bem-vindo(a), ${nome}!`
  );

  notificador.enviarSMS(
    telefone,
    `Olá ${nome}, seu cadastro foi realizado com sucesso!`
  );

  return res.status(201).json({
    mensagem: 'Usuário cadastrado com sucesso'
  });
};

module.exports = {
  register
};  