import { Schema as _Schema, model } from "mongoose";
import Joi from "joi";

const Schema = _Schema;

const emailSchema = new Schema({
  name: String,
  email: String,
  message: String,
  sentAt: String,
  avatar: Schema.Types.Mixed,
});

const Email = model("Email", emailSchema, "emails");

const validateEmail = (email) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(200).required(),
    message: Joi.string().max(600).required(),
    avatar: Joi.any(),
  });

  return schema.validate(email);
};

export { Email, validateEmail };
