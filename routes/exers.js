const express = require("express");
const router = express.Router();
const { Exer } = require("../models/exerSchema");

router.get("/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const exer = await Exer.findById(id);
      return res.send({ exer });
    }
    const exers = await Exer.find();
    return res.send({ exers });
  } catch (error) {
    return res.send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Exer.findByIdAndDelete({ _id: id });
    return res.send({ message: "deleted successfully!" });
  } catch (err) {
    console.log(err);
  }
});

// addExer API
router.post("/", async (req, res) => {
  try {
    const exer = new Exer({
      ...req.body,
    });
    await exer.save();
    return res.send({ message: "Exer created successfully!" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const exer = await Exer.findOneAndUpdate({ _id: id }, updates);
    return res.send({ exer });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
