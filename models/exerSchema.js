const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const exerSchema = new Schema({
  name: String,
  description: String,
  img: String,
  vid: String,
});


const Exer = mongoose.model("Exer", exerSchema,'exercises');



module.exports = {Exer};

