
const express = require('express');

const router = express.Router();

const {
  listarProdutos,
  criarProduto
} = require(
  '../controllers/produtoController'
);

router.get(
  '/produtos',
  listarProdutos
);

router.post(
  '/produtos',
  criarProduto  
);

module.exports = router;
            
            