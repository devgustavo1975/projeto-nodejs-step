const notificador = require('../services/notificador');

function notificacaoMiddleware(req, res, next) {
  const usuario = req.body;

  notificador.enviarEmail(
    usuario.email,
    'Cadastro realizado com sucesso',
    `Olá ${usuario.nome}, seu cadastro foi realizado com sucesso!`
  );

  notificador.enviarSMS(
    usuario.telefone,
    `Olá ${usuario.nome}, seu cadastro foi concluído com sucesso!`
  );

  next();
}

module.exports = notificacaoMiddleware;