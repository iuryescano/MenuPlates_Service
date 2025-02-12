exports.up = knex => knex.schema.createTable('categories', table => {
  table.increments('id'); // ID da categoria
  table.text('Name').notNullable();
  table.integer('plate_id').references('id').inTable('plates').onDelete('SET NULL');
});

exports.down = knex => knex.schema.dropTable('categories');