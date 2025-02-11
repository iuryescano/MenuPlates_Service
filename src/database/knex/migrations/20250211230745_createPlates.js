exports.up = knex => knex.schema.createTable('plates', table => {
  table.increments('id');
  table.text('name').notNullable();
  table.text('image').notNullable(); // Se for URL ou base64, melhor usar text
  table.string('category').notNullable();
  table.text('ingredients').notNullable(); // Salvar como JSON se possível
  table.decimal('price', 10, 2).notNullable(); // Correto para valores monetários
  table.text('description').notNullable();
  
  table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('plates');
