const express = require("express");
const app = express();
const color = require("colors");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const connectDB = require("./db/connect");
const users = require("./route/user-route");
const profiles = require("./route/p-route");

// middlewares
app.use(cors());
app.use(express.json());
/// view routes
app.use("/reset/otp", express.static("./public/otp-password/dist"));
app.use("/login", express.static("./public/login/dist"));
app.use("/signup", express.static("./public/signup/dist"));
app.use("/create/profile", express.static("./public/add_profile/dist"));
app.use("/verify", express.static("./public/verify-email/dist"));
app.use("/weiwo/:id", express.static("./public/media"));
app.use("/new/password", express.static("./public/reset-password/dist"));

// /////////

const PORT = process.env.PORT || 8080;
const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening to post ${PORT}`.blue);
    });
  } catch (e) {
    console.log(`${e}`.red);
  }
};
startDB();
////////////////

app.use("/api/v1/users", users);
app.use("/api/v1/profiles", profiles);
