const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/user");
const Post = require("./models/post");

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

app.get("/users", async function readUsers(_req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.put("/users/:id", async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    let user;
    try {
      user = await User.findById(id).orFail();
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        error: `User with id: ${id} not found`,
      });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.delete("/users/:id", async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    try {
      await User.findById(id).orFail();
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        error: `User with id: ${id} not found`,
      });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: `User with id: ${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.get("/users/:id", async function findUser(req, res) {
  const { id } = req.params;
  try {
    let user;
    try {
      user = await User.findById(id).orFail();
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        error: `User with id: ${id} not found`,
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.post("/posts", async function createPost(req, res) {
  const { userId, title, body } = req.body;

  try {
    let user;
    try {
      user = await User.findById(userId).orFail();
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        error: `User with id: ${userId} not found`,
      });
    }

    let post;
    try {
      post = await Post.create({
        title,
        body,
        user: user.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

app.get("/posts", async function readPosts(req, res) {
  try {
    const posts = await Post.find().populate("user", "-email -_id");
    return res.status(200).json(posts);
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
