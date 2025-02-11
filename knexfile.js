<<<<<<< HEAD
const path = require("path");
=======
const path = require('path');
>>>>>>> a23cc67edbb73deac9a40e4a0ecafe1890e246fb

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
<<<<<<< HEAD
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },

    useNullAsDefault: true
  }
=======
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    useNullAsDefault: true,
  },
>>>>>>> a23cc67edbb73deac9a40e4a0ecafe1890e246fb
};
