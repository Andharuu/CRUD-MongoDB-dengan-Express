const express = require("express");
const { getDb } = require("../db/conn");
const { ObjectId } = require("mongodb");

const router = express.Router();

// 1. READ: Mengambil semua data dosen
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("dosen");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({ message: "Gagal mengambil data", error: err.message });
  }
});

// 2. READ: Mengambil satu data dosen berdasarkan ID MongoDB (_id)
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("dosen");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
    
    if (!result) {
      res.status(404).send("Data tidak ditemukan");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ message: "Gagal mengambil data spesifik", error: err.message });
  }
});

// 3. CREATE: Menambahkan data dosen baru
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("dosen");
    const result = await collection.insertOne(req.body);
    // Mengembalikan status 204 (No Content) sesuai dengan standar REST API di tutorial
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send({ message: "Gagal menambah data", error: err.message });
  }
});

// 4. UPDATE: Mengubah data dosen yang sudah ada berdasarkan ID
router.patch("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("dosen");
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: req.body }; // Menggunakan operator $set dari MongoDB
    
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Gagal memperbarui data", error: err.message });
  }
});

// 5. DELETE: Menghapus data dosen berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("dosen");
    const query = { _id: new ObjectId(req.params.id) };
    
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Gagal menghapus data", error: err.message });
  }
});

module.exports = router;