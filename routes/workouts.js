const express = require("express");
const router = express.Router();
const { User } = require("../models/userSchema");

router.post("/", async (req, res) => {
  try {
    const { email, date } = req.body;
    const user = await User.findOne({ email });
    user.workouts.push({ date });
    await user.save();
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email, date } = req.query;
    const user = await User.findOne({ email });
    const workout = user.workouts.find((workout) => workout.date === date);
    return res.send(workout);
  } catch (err) {
    console.log(err);
    return res.send({ message: err.message });
  }
});

router.post("/rows", async (req, res) => {
  try {
    const { email, date, exercise } = req.body;
    const user = await User.findOne({ email });
    const workout = user.workouts.find((workout) => workout.date === date);
    workout.rows.push(exercise);
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

router.put("/rows", async (req, res) => {
  try {
    const { email, date, id, editedExer } = req.body;
    const user = await User.findOne({ email });
    const workout = user.workouts.find((workout) => workout.date === date);
    const row = workout.rows.find((row) => row._id.toString() === id);
    row.set1 = editedExer.set1;
    row.set2 = editedExer.set2;
    row.set3 = editedExer.set3;
    row.set4 = editedExer.set4;
    row.rest = editedExer.rest;
    row.weight = editedExer.weight;
    row.exerciseName = editedExer.exerciseName;
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

router.delete("/rows", async (req, res) => {
  try {
    const { email, date, id } = req.body;
    const user = await User.findOne({ email });
    const workout = user.workouts.find((workout) => workout.date === date);
    const rowIndex = workout.rows.findIndex((row) => row._id.toString() === id);
    workout.rows.splice(rowIndex, 1);
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

module.exports = router;
