import { Schema as _Schema, SchemaTypes, model } from "mongoose";
import jwt from "jsonwebtoken";

const { sign } = jwt;

import Joi from "joi";

const Schema = _Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  thirdPartyAuthentication: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  acceptTerms: {
    type: Boolean,
    required: true,
  },
  liked: {
    type: Boolean,
  },
  avatar: {
    type: _Schema.Types.Mixed,
  },
  createdAt: {
    type: String,
  },
  workouts: [[{ type: Schema.Types.ObjectId, ref: "Workout" }]],
});

userSchema.methods.generateAuthToken = (email, id) => {
  const token = sign({ email, id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = model("User", userSchema, "users");

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    thirdPartyAuthentication: Joi.string(),
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    acceptTerms: Joi.valid(true).required(),
    liked: Joi.valid(false).required(),
    avatar: Joi.string(),
    createdAt: Joi.string(),
    workouts: Joi.array(),
  });

  return schema.validate(user);
};

export { User, validateUser };
