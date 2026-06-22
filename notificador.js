const EventEmitter = require('events');

class Notificador extends EventEmitter {
  enviarEmail(para, assunto, corpo) {
    this.emit('emailEnviado', {
      para,
      assunto,
      corpo,
      data: new Date()
    });
  }

  enviarSMS(numero, mensagem) {
    this.emit('smsEnviado', {
      numero,
      mensagem,
      data: new Date()
    });
  }
}

const notificador = new Notificador();

// Listener de e-mail
notificador.on('emailEnviado', (dados) => {
  console.log('\n📧 E-mail enviado');
  console.log('Para:', dados.para);
  console.log('Assunto:', dados.assunto);
  console.log('Corpo:', dados.corpo);
  console.log('Data:', dados.data);
});

// Listener de SMS
notificador.on('smsEnviado', (dados) => {
  console.log('\n📱 SMS enviado');
  console.log('Número:', dados.numero);
  console.log('Mensagem:', dados.mensagem);
  console.log('Data:', dados.data);
});

module.exports = notificador;