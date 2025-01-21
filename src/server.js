const express = require('express');
const app = express();

app.get("/message/:id/:user", (req, res) => {
  const { id, user } = req.params;
  
  res.send(`
      Id da mensagem é: ${id}
      Para o usuario: ${user}
    `)
});

app.get("/users", (req, res) => {
  const { page, limit } = req.query;

  res.send(`Pagina: ${page} e Limite: ${limit}`);
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));