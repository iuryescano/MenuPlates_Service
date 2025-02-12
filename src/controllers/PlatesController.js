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
    const { name, user_id, ingredients } = request.query;

    let plates;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      plates = await knex("ingredients")
      .select ([
        "plates.id",
        "plates.Name",
        "plates.user_id",
      ])
        .where("plates.user_id", user_id)
        .whereLike("plates.Name", `%${name}%`)
        .whereIn("ingredients.Name", filterIngredients)
        .innerJoin("plates", "plates.id", "ingredients.plate_id")
        .groupBy("plates.id");

    } else {

    plates = await knex("plates")
      .where({ user_id })
      .whereLike("name", `%${name}%`)
      .orderBy("name");
    }
    
    const userIngredients = await knex("ingredients").whereIn("plate_id", plates.map(plate => plate.id));
    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = userIngredients.filter(ingredient => ingredient.plate_id === plate.id);
      return {
        ...plate,
        ingredients: plateIngredients.map(ingredient => ingredient.Name)
      };
    });
    
    return response.json(platesWithIngredients);

  }
}

module.exports = PlatesController;