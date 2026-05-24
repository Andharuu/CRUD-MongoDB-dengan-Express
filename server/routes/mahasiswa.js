const express = require("express");
const { getDb } = require("../db/conn");
const { ObjectId } = require("mongodb");

const router = express.Router();

// READ: Mengambil semua data mahasiswa
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const results = await db.collection("mahasiswa").find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
});

// READ: Mengambil satu data mahasiswa
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const query = { _id: new ObjectId(req.params.id) };
    const result = await db.collection("mahasiswa").findOne(query);
    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
});

// CREATE: Menambah mahasiswa
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("mahasiswa").insertOne(req.body);
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
});

// UPDATE: Mengedit mahasiswa
router.patch("/:id", async (req, res) => {
  try {
    const db = getDb();
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: req.body };
    const result = await db.collection("mahasiswa").updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
});

// DELETE: Menghapus mahasiswa
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const query = { _id: new ObjectId(req.params.id) };
    const result = await db.collection("mahasiswa").deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
});

module.exports = router;