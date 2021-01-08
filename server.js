const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/user");

const { DATABASE_URI } = process.env;

const app = express();
app.use(express.json());

app.post("/users", async function createUser(req, res) {
  const { name, email, role } = req.body;
  try {
    let user;
    try {
      user = await User.create({ name, email, role });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.listen(5000, async function bootApp() {
  try {
    console.log("Server listening on http://localhost:5000");
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established successfully!");
  } catch (error) {
    console.log(error);
  }
});
