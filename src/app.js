
const express = require('express');

const usuarioRoutes = require(
  './routes/usuarioRoutes'
);

const produtoRoutes = require(
  './routes/produtoRoutes'
);

const app = express();

app.use(express.json());

app.use(usuarioRoutes);
app.use(produtoRoutes);

module.exports = app;
            
            