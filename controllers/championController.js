import { Champ } from "../models/champSchema.js";

export async function getChamp(req, res) {
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
}

export async function deleteChamp(req, res) {
  try {
    const id = req.body.id;
    const champ = await Champ.findByIdAndDelete(id);
    if (!champ) {
      return res.status(404).send({ error: "Champion not found" });
    }
    return res.send({ message: "Deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function createChamp(req, res) {
  try {
    const champ = new Champ({
      ...req.body,
    });
    await champ.save();
    return res.send({ message: "champ created successfully!" });
  } catch (err) {
    console.log(err);
  }
}

export async function updateChamp(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;
    const champ = await Champ.findByIdAndUpdate(id, updates, {
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
}
