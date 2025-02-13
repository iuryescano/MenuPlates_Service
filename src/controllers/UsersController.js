const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create (request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = ?', [email]);

    if(checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);


    return response.status(201).json();

   // if(!name) {
   //   throw new AppError('Name is required');
    }

    //res.send(`User: ${name}, Mail: ${email}, Password: ${password}`); [TESTE]
    //response.json({ name, email, password });
    //}
  async update (request, response) {
    const { name, email, password, oldpassword } = request.body;
    const  user_id  = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = ?', [user_id]);

    if(!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email address already used.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !oldpassword) {
      throw new AppError('You need to inform the old password to set a new password.');
    }

    if (password && oldpassword) {
      const checkOldPassword = await compare(oldpassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }
    
    await database.run(`UPDATE users SET 
                        name = ?, 
                        email = ?, 
                        password = ?, 
                        updated_at = DATETIME('now') 
                        WHERE id = ?`, 
                        [user.name, user.email, user.password, user_id]);

    return response.json();
  } 
}

module.exports = UsersController;