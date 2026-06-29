const fs = require('fs');

const LogToJsonStream = require('./streams/LogToJsonStream');

const leitura = fs.createReadStream('./logs/app.log');

const escrita = fs.createWriteStream('./logs/app.json');

const transform = new LogToJsonStream();

leitura
    .pipe(transform)
    .pipe(escrita);

escrita.on('finish', () => {
    console.log('Arquivo JSON criado com sucesso!');
});