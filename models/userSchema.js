const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

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
    type: Boolean
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: String
  },
  workouts: [{
    date: String,
    rows: [{
      id: mongoose.SchemaTypes.ObjectId,
      exer: String,
      set1: Number,
      set2: Number,
      set3: Number,
      set4: Number,
      rest: String,
      weight: Number,
    }]
  }]
});

userSchema.methods.generateAuthToken = (email,password) => {
  const token = jwt.sign({ email , password }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema, 'users');

const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(20).required(),
    email: joi.string().min(5).max(200).required().email(),
    password: joi.string().min(5).max(1024).required(),
    acceptTerms: joi.valid(true).required(),
    liked: joi.valid(false).required(),
    avatar: joi.string(),
    createdAt: joi.string(),
    workouts: joi.array(),
  });

  return schema.validate(user);
};

module.exports = {User, validateUser};

