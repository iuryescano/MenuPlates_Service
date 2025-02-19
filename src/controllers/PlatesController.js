const knex = require("../database/knex");

class PlatesController{
  async create(request, response){
    const { Name, Image, Price, Description, category, ingredients } = request.body;
    const { user_id } = request.params;

    const [ plate_id ] = await knex("plates").insert({
      Name,
      Image,
      Price,
      Description,
      user_id
    });

    const categoryInsert = category.map(catName  => {
      return {
        plate_id,
        Name: catName 
      }
    });

    await knex("categories").insert(categoryInsert);

    const ingredientInsert = ingredients.map(ingName  => {
      return {
        plate_id,
        Name: ingName,
        user_id
      }
    });

    await knex("ingredients").insert(ingredientInsert);

    response.json();
  }

  async show(request, response){
    const { id } = request.params;

    const plate = await knex("plates").where("id", id).first();

    if(!plate){
      return response.status(400).json({ message: "Plate not found." });
    }

    const ingredients = await knex("ingredients").where("plate_id", id).select("Name").orderBy("Name");

    const categories = await knex("categories").where("plate_id", id).select("Name").orderBy("Name");

    return response.json({ 
      ...plate, 
      ingredients, 
      categories 
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("plates").where("id", id).delete();

    return response.json(
      { message: "Plate deleted.",
        id: id
      }
    );
  }

  async index(request, response) {
    const { name, category, ingredients } = request.query;
    let plates;

    // Se algum filtro for enviado, construa a query dinamicamente
    if (name || category || ingredients) {
      let query = knex("plates").select(
        "plates.id",
        "plates.Name",
        "plates.user_id",
        "plates.Description",
        "plates.Image",
        "plates.Price"
      );

      // Se category for fornecida, faça o join com categories e filtre
      if (category) {
        query = query
          .innerJoin("categories", "plates.id", "categories.plate_id")
          .where("categories.Name", "like", `%${category}%`);
      }

      // Se ingredients for fornecido, faça o join com ingredients e filtre
      if (ingredients) {
        // Separa os ingredientes (caso venha uma lista separada por vírgulas)
        const filterIngredients = ingredients.split(',').map(ing => ing.trim());
        query = query
          .leftJoin("ingredients", "plates.id", "ingredients.plate_id")
          .modify(q => {
            // Se for apenas um ingrediente, faz um filtro parcial com LIKE
            if (filterIngredients.length === 1) {
              q.where("ingredients.Name", "like", `%${filterIngredients[0]}%`);
            } else {
              // Se forem vários, pode usar whereIn (ou ainda usar várias condições LIKE se desejar uma busca parcial em cada um)
              q.whereIn("ingredients.Name", filterIngredients);
            }
          });
      }

      // Se name for fornecido, filtra pelo nome do prato
      if (name) {
        query = query.where("plates.Name", "like", `%${name}%`);
      }

      // Para evitar duplicação de registros devido aos joins, agrupe pelo ID do prato
      query = query.groupBy("plates.id");

      plates = await query;
    } else {
      // Se nenhum filtro for enviado, retorna todos os pratos
      plates = await knex("plates").select("*");
    }

    // Recupera os ingredientes para cada prato
    const allIngredients = await knex("ingredients")
      .whereIn("plate_id", plates.map(plate => plate.id));

    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = allIngredients.filter(ing => ing.plate_id === plate.id);
      return {
        ...plate,
        ingredients: plateIngredients.map(ing => ing.Name)
      };
    });

    return response.json(platesWithIngredients);
  }
  

  async update(request, response) {
    const { id } = request.params;
    const { Name, Image, Price, Description, category, ingredients } = request.body;

    const plate = await knex("plates").where("id", id).first();

    if (!plate) {
      return response.status(400).json({ message: "Plate not found." });
    }

    await knex("plates").where("id", id).update({
      Name,
      Image,
      Price,
      Description
    });

    if (category) {
      await knex("categories").where("plate_id", id).delete();
      const categoryInsert = category.map(catName => {
        return {
          plate_id: id,
          Name: catName
        };
      });
      await knex("categories").insert(categoryInsert);
    }

    if (ingredients) {
      await knex("ingredients").where("plate_id", id).delete();
      const ingredientInsert = ingredients.map(ingName => {
        return {
          plate_id: id,
          Name: ingName
        };
      });
      await knex("ingredients").insert(ingredientInsert);
    }

    return response.json();
  }
}

module.exports = PlatesController;