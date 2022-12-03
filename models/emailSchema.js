const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  name: String,
  email: String,
  message: String,
  sentAt: String,
});


const Email = mongoose.model("Email" , emailSchema , 'emails');

const validateEmail = (email) => {
  const schema = joi.object({
    name: joi.string().min(5).max(20).required(),
    email: joi.string().min(5).max(200).required().email(),
    message: joi.string().max(600).required(),
  });

  return schema.validate(email);
};


module.exports = {Email , validateEmail};

