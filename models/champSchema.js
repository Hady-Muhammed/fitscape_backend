import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const champSchema = new Schema({
  name: String,
  description: String,
  img: String,
});

const Champ = model("Champ", champSchema, "champions");

export { Champ };
