const mongoose = require("mongoose");

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB conectado!");
  } catch (erro) {
    console.error("Erro ao conectar no MongoDB:", erro.message);
    process.exit(1);
  }
};

module.exports = conectarBanco;