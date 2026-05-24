const { MongoClient } = require("mongodb");
require("dotenv").config();

// Mengambil URI dari .env, jika tidak ada default ke localhost
const connectionString = process.env.ATLAS_URI || "mongodb://localhost:27017";
const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  // Fungsi untuk menginisialisasi koneksi ke server MongoDB saat start
  connectToServer: async function () {
    try {
      const conn = await client.connect();
      // Mengarahkan langsung ke nama database 'edu_mongo' sesuai materi
      dbConnection = conn.db("edu_mongo");
      console.log("Koneksi ke MongoDB berhasil!");
    } catch (e) {
      console.error("Gagal koneksi ke MongoDB:", e);
    }
  },
  
  // Fungsi pembantu untuk mengambil objek DB yang aktif di file lain
  getDb: function () {
    return dbConnection;
  }
};