import argon2 from "argon2";
import { User } from "../models/userSchema.js";
import Joi from "joi";

export async function login(req, res) {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(401).send({ message: error.details[0].message });

    let userExists = await User.findOne({ email: req.body.email });
    if (!userExists)
      return res.status(401).send({ message: "Invalid email or password!" });
    const validPassword = await argon2.verify(
      req.body.password,
      userExists?.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid password!" });

    const token = userExists.generateAuthToken(
      userExists?.email,
      userExists?._id
    );
    return res
      .status(200)
      .send({ token: token, message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
}

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};
