const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

// Registrar usuário
const registrar = async (req, res, next) => {
  try {
    console.log("=== REGISTRAR ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    if (!req.body) {
      return res.status(400).json({
        erro: "A requisição não possui body. Verifique se está enviando JSON e o header Content-Type: application/json.",
      });
    }

    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Os campos nome, email e senha são obrigatórios.",
      });
    }

    const existe = await Usuario.findOne({ email });

    if (existe) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      role: role || "user",
    });

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        role: usuario.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      mensagem: "Usuário registrado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    console.log("=== LOGIN ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    if (!req.body) {
      return res.status(400).json({
        erro: "A requisição não possui body.",
      });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios.",
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        role: usuario.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// Perfil
const perfil = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select("-senha");

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    return res.json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (erro) {
    next(erro);
  }
};

module.exports = { registrar, login, perfil };