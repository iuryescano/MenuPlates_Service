exports.up = knex => knex.schema.createTable('plates', table => {
  table.increments('id'); // ID do prato
  table.text('Name').notNullable();
  table.text('Image').notNullable();
  table.decimal('Price', 10, 2).notNullable();
  table.text('Description').notNullable();
  table.integer('user_id').references('id').inTable('users');

  table.timestamp('Created_at').defaultTo(knex.fn.now());
  table.timestamp('Updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('plates');