const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongodb connected");
  }
);

app.use(express.json());
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("server running");
});
