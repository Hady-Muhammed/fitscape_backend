const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const champSchema = new Schema({
  name: String,
  description: String,
  img: String,
});


const Champ = mongoose.model("Champ", champSchema,'champions');



module.exports = {Champ};

