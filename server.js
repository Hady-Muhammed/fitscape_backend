import dotenv from "dotenv";

import express, { json } from "express";
const app = express();
import cors from "cors";
import connection from "./db.js";
import usersRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js";
import champsRoutes from "./src/routes/champs.js";
import exersRoutes from "./src/routes/exers.js";
import workoutsRoutes from "./src/routes/workouts.js";
dotenv.config();
// connect to DB
connection();
// static files
app.use(express.static("./images"));
// middlewares
app.use(cors());
app.use(json());
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/champs", champsRoutes);
app.use("/api/exercises", exersRoutes);
app.use("/api/workouts", workoutsRoutes);
app.get("/", (req, res) => res.send("<h1>Hello World! asdsd</h1>"));

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
