exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id'); // ID do ingrediente
  table.text('Name').notNullable();

  table.integer('plate_id').references('id').inTable('plates').onDelete('CASCADE');
  table.integer('user_id').references('id').inTable('users');


});

exports.down = knex => knex.schema.dropTable('ingredients'); 