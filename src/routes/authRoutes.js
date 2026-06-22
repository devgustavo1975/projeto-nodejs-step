const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const notificacaoMiddleware = require('../middlewares/notificacaoMiddleware');

router.post(
  '/register',
  notificacaoMiddleware,
  authController.register
);

module.exports = router;