import { Schema as _Schema, SchemaTypes, model } from "mongoose";

const Schema = _Schema;

const workoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: String,
    required: true,
  },
  rows: [
    {
      id: SchemaTypes.ObjectId,
      exerciseName: String,
      set1: Number,
      set2: Number,
      set3: Number,
      set4: Number,
      rest: String,
      weight: Number,
      order: { type: Number, required: true }, // New field for ordering
    },
  ],
});

const Workout = model("Workout", workoutSchema, "workouts");

export { Workout };
