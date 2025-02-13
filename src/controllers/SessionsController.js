const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where("email", email).first();

    if (!user) {
      throw new AppError("Email e/ou Senha Incorreta", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email e/ou Senha Incorreta", 401);
    }
    
    const { secret, expiresIn } = authConfig.jwt; //pegando o secret e o tempo de expiração do arquivo auth.js
    const token = sign({}, secret, { //criando o token de fato
      subject: String(user.id), //id do usuario
      expiresIn //tempo de expiração do token
    });

    return response.json({ user, token }); //retornando o usuario e o token
  }
}

module.exports = SessionsController;