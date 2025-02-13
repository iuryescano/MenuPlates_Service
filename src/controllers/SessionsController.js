const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where("email", email).first();

    if (!user) {
      throw new AppError("Email e/ou Senha Incorreta", 401);
    }
    

    return response.json({ user });
  }
}

module.exports = SessionsController;