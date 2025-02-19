const express = require("express");
const { resolve } = require("path");
require("dotenv").config();
const connectToDb = require("./db");
const { User, validateUser } = require("./schema");

const db = process.env.DB_URI;

const app = express();
app.use(express.json());
const port = 3010;

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.post("/api/users", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: "Enter details correctly" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.error("Error saving user");
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, async () => {
  await connectToDb(db);
  console.log(`Example app listening at http://localhost:${port}`);
});
