import { Schema as _Schema, model } from "mongoose";
import Joi from "joi";
const { object, string } = Joi;

const Schema = _Schema;

const emailSchema = new Schema({
  name: String,
  email: String,
  message: String,
  sentAt: String,
  avatar: String,
});

const Email = model("Email", emailSchema, "emails");

const validateEmail = (email) => {
  const schema = object({
    name: string().min(5).max(20).required(),
    email: string().min(5).max(200).required().email(),
    message: string().max(600).required(),
    avatar: string(),
  });

  return schema.validate(email);
};

export { Email, validateEmail };
