const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Surendra" }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted ✅" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
