import { User } from "../models/userSchema.js";
import { Workout } from "../models/workoutSchema.js";

export async function addWorkout(req, res) {
  try {
    const { email, date } = req.body;
    const user = await User.findOne({ email });
    const workout = new Workout({
      createdAt: date,
      user: req.user.id,
    });
    user.workouts.push(workout._id);
    await user.save();
    await workout.save();
    return res.send(workout);
  } catch (err) {
    console.log(err);
    return res.send({ message: err.message });
  }
}

export async function getWorkout(req, res) {
  try {
    const { date } = req.query;
    const workout = await Workout.findOne({
      createdAt: date,
      user: req.user.id,
    });
    if (!workout) {
      return res.status(404).send({ message: "Workout not found!" });
    }
    workout.rows.sort((a, b) => a.order - b.order);
    return res.send(workout);
  } catch (err) {
    console.log(err);
    return res.send({ message: err.message });
  }
}

export async function addRow(req, res) {
  try {
    const { id, exercise } = req.body;
    const workout = await Workout.findById(id);
    workout.rows.push({ ...exercise, order: workout.rows.length + 1 });
    console.log(workout);

    await workout.save();
    return res.send(workout);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
}

export async function updateRow(req, res) {
  try {
    const { date, id, editedExer } = req.body;
    const workout = await Workout.findOne({
      createdAt: date,
      user: req.user.id,
    });
    const row = workout.rows.find((row) => row._id.toString() === id);
    row.set1 = editedExer.set1;
    row.set2 = editedExer.set2;
    row.set3 = editedExer.set3;
    row.set4 = editedExer.set4;
    row.rest = editedExer.rest;
    row.weight = editedExer.weight;
    row.exerciseName = editedExer.exerciseName;
    await workout.save();
    return res.send(workout);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
}

export async function deleteRow(req, res) {
  try {
    const { date, id } = req.body;
    const workout = await Workout.findOne({
      createdAt: date,
      user: req.user.id,
    });
    const rowIndex = workout.rows.findIndex((row) => row._id.toString() === id);
    workout.rows.splice(rowIndex, 1);
    await workout.save();
    return res.send(workout);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
}

export async function reorderRow(req, res) {
  const { workoutId } = req.params;
  const { firstRowId, secondRowId } = req.body.rows;
  console.log(workoutId);

  try {
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const firstRow = workout.rows.find(
      (row) => row._id.toString() === firstRowId
    );
    const secondRow = workout.rows.find(
      (row) => row._id.toString() === secondRowId
    );

    if (!firstRow || !secondRow) {
      return res.status(404).json({ message: "One or both rows not found" });
    }

    // Swap the order of the two rows
    const tempOrder = firstRow.order;
    firstRow.order = secondRow.order;
    secondRow.order = tempOrder;

    await workout.save();
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
