
require('dotenv').config();

const app = require('./src/app');
const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

const conectarBanco = require(
  './src/database/database'
);

conectarBanco();

app.listen(process.env.PORT, () => {

  console.log(
    'Servidor rodando'
  );
});
            
            