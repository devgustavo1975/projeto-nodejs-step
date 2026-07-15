const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function conectar() {
  if (cached.conn) return cached.conn;

  const MONGODB_URL = process.env.MONGO_URL;

  if (!MONGODB_URL) {
    throw new Error("MONGO_URL não encontrada no .env");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

module.exports = conectar;