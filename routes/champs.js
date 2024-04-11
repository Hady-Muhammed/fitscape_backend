const express = require("express");
const router = express.Router();
const { Champ } = require("../models/champSchema");

router.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      const id = req.query.id;
      const champ = await Champ.findById(id);
      if (!champ) {
        return res.status(404).send({ error: "Champion not found" });
      }
      return res.send({ champ });
    }
    const champs = await Champ.find();
    return res.send({ champs });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const name = req.query.name;
    const champ = await Champ.findOneAndDelete({ name });
    if (!champ) {
      return res.status(404).send({ error: "Champion not found" });
    }
    return res.send({ message: "Deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const champ = new Champ({
      ...req.body,
    });
    await champ.save();
    return res.send({ message: "champ created successfully!" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const name = req.query.name;
    const updates = req.body;
    const champ = await Champ.findOneAndUpdate({ name }, updates, {
      new: true,
    });
    if (!champ) {
      return res.status(404).send({ error: "Champion not found" });
    }
    return res.send({ champ });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = router;
