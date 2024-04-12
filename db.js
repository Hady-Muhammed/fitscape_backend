import { connect } from "mongoose";

export default () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // monogodb connection
  try {
    connect(process.env.DB, connectionParams)
      .then((res) => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
  } catch (error) {}
};
