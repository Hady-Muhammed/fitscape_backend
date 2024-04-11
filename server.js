require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const champsRoutes = require("./routes/champs");
const exersRoutes = require("./routes/exers");
const workoutsRoutes = require("./routes/workouts");
// connect to DB
connection();
// static files
app.use(express.static("./images"));
// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/champs", champsRoutes);
app.use("/api/exercises", exersRoutes);
app.use("/api/workouts", workoutsRoutes);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
