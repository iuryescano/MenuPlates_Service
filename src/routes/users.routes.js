const { Router } = require("express");

const usersRouter = Router();

usersRouter.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //res.send(`User: ${name}, Mail: ${email}, Password: ${password}`); [TESTE]
  res.json({ name, email, password });
})

module.exports = usersRouter; // Export app for testing