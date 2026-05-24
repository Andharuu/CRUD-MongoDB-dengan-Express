require("dotenv").config(); // Memuat variabel dari file .env secara otomatis
const express = require("express");
const cors = require("cors");
const { connectToServer } = require("./db/conn");
const dosenRoutes = require("./routes/dosen");
const mahasiswaRoutes = require("./routes/mahasiswa");

const app = express();

// Middleware
app.use(cors()); // Mengizinkan aplikasi frontend (seperti React) mengakses API ini
app.use(express.json()); // Mengizinkan Express membaca data berformat JSON dari request body

const PORT = process.env.PORT || 5050;

// Mendaftarkan endpoint utama untuk rute dosen
app.use("/dosen", dosenRoutes);
// Mendaftarkan endpoint utama untuk rute mahasiswa
app.use("/mahasiswa", mahasiswaRoutes);
// Menghubungkan ke database MongoDB terlebih dahulu, jika sukses baru nyalakan server
connectToServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Express berjalan dengan aman di port: ${PORT}`);
  });
});
