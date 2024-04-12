import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const exerSchema = new Schema({
  name: String,
  description: String,
  img: String,
  vid: String,
});

const Exer = model("Exer", exerSchema, "exercises");

export { Exer };
