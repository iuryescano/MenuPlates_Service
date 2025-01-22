const AppError = require('../utils/AppError');

class UsersController {
  create (request, response) {
    const { name, email, password } = request.body;

    if(!name) {
      throw new AppError('Name is required');
    }

    //res.send(`User: ${name}, Mail: ${email}, Password: ${password}`); [TESTE]
    response.json({ name, email, password });
  }
}

module.exports = UsersController;