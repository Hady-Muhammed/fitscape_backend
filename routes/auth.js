const router = require("express").Router();
const { User } = require("../models/userSchema");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Login API
router.post("/" , async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userExists = await User.findOne({ email: req.body.email });
    if (!userExists)
      return res.status(401).send({ message: "Invalid email or password!" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExists?.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid email or password!" });

    const token = userExists.generateAuthToken(req.body.email,req.body.password);
    return res
      .status(200)
      .send({ token: token, message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});



const validateUser = (user) => {
  const schema = joi.object({
    email: joi.string().min(5).max(200).required().email(),
    password: joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

module.exports = router;
