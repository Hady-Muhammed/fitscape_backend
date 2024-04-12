import { validateUser, User } from "../models/userSchema.js";
import { Email, validateEmail } from "../models/emailSchema.js";
import { genSalt, hash } from "bcrypt";

export async function registerUser(req, res) {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(409).send({ message: "That user already exists!" });

    const salt = await genSalt(Number(process.env.SALT));
    const hashPassword = await hash(req.body.password, salt);
    const user = new User({ ...req.body, password: hashPassword });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function getUser(req, res) {
  try {
    const email = req.params.email;
    let user = await User.findOne({ email });
    return res.send({ user });
  } catch (err) {
    console.log(err);
  }
}

export async function isLiked(req, res) {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    return res.send({ liked: user.liked });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllLikes(req, res) {
  try {
    const users = await User.find({ liked: true });
    return res.send({ likes: users.length });
  } catch (err) {
    console.log(err);
  }
}

export async function getRecentEmails(req, res) {
  try {
    const num = req.params.num;
    const emails = await Email.find().sort({ _id: -1 }).limit(num);
    return res.send({ emails });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllAccounts(req, res) {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllWorkouts(req, res) {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    return res.send({ workouts: user?.workouts });
  } catch (error) {
    return res.send({ error });
  }
}

export async function getAvatar(req, res) {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    return res.send({ avatar: user.avatar });
  } catch (err) {
    return res.send({ message: err.message });
  }
}

export async function likeApp(req, res) {
  try {
    const { email } = req.body;
    let user = await User.findOneAndUpdate({ email }, { liked: true });
    return res.send({ user });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.send({ message: "User deleted successfully!" });
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      await User.findOneAndUpdate({ email }, { email, name });
    } else {
      const hashPassword = await hash(password, 10);
      await User.findOneAndUpdate(
        { email },
        { email, name, password: hashPassword }
      );
    }
    return res.send("User updated successfully!");
  } catch (error) {
    console.log(error);
  }
}

export async function sendEmail(req, res) {
  try {
    const { email, message } = req.body;
    let user = await User.findOne({ email });
    const date =
      new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      new Date().toLocaleTimeString();
    console.log(user);
    const validEmail = validateEmail({
      name: user.name,
      email: email,
      message: message,
      avatar: user.avatar || "default",
    });
    if (!validEmail) return res.send({ error: "data entered is wrong" });

    await new Email({
      name: user.name,
      email: email,
      message: message,
      sentAt: date,
      avatar: user.avatar || "default",
    }).save();

    return res.send({ name: user.name, email: user.email, sentAt: date });
  } catch (err) {
    console.log(err);
  }
}

export async function uploadImage(req, res) {
  try {
    const { email, file } = req.body;
    const user = await User.findOne({ email });
    user.avatar = file;
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.send({ message: error.message });
  }
}
