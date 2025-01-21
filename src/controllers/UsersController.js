class UsersController {
  create (request, response) {
    const { name, email, password } = request.body;

    //res.send(`User: ${name}, Mail: ${email}, Password: ${password}`); [TESTE]
    response.json({ name, email, password });
  }
}

module.exports = UsersController;