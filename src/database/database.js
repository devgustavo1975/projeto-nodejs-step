const dns = require("node:dns");
 
dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);
 
const mongoose = require("mongoose");
 
const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error(error);
  }
};
 
module.exports = conectarBanco;
          