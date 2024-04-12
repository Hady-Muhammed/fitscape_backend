import { Schema as _Schema, SchemaTypes, model } from "mongoose";
import jwt from "jsonwebtoken";

const { sign } = jwt;

import Joi from "joi";
const { object, string, valid, array } = Joi;

const Schema = _Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
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
  workouts: [
    {
      date: String,
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
        },
      ],
    },
  ],
});

userSchema.methods.generateAuthToken = (email, password) => {
  const token = sign({ email, password }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = model("User", userSchema, "users");

const validateUser = (user) => {
  const schema = object({
    name: string().min(5).max(20).required(),
    email: string().min(5).max(200).required().email(),
    password: string().min(5).max(1024).required(),
    acceptTerms: valid(true).required(),
    liked: valid(false).required(),
    avatar: string(),
    createdAt: string(),
    workouts: array(),
  });

  return schema.validate(user);
};

export { User, validateUser };
