import jwt from "jsonwebtoken";
const { verify } = jwt;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  try {
    const decoded = verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Invalid token." });
  }
};
