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

    if (category) {
      if (ingredients) {
        const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

        plates = await knex("ingredients")
          .select([
            "plates.id",
            "plates.Name",
            "plates.user_id",
            "plates.Description",
            "plates.Image",
            "plates.Price"
          ])
          .whereLike("plates.Name", `%${name || ''}%`)
          .whereIn("ingredients.Name", filterIngredients)
          .innerJoin("plates", "plates.id", "ingredients.plate_id")
          .innerJoin("categories", "plates.id", "categories.plate_id")
          .where("categories.Name", category)
          .groupBy("plates.id");

      } else {
        plates = await knex("plates")
          .select([
            "plates.id",
            "plates.Name",
            "plates.user_id",
            "plates.Description",
            "plates.Image",
            "plates.Price"
          ])
          .whereLike("plates.Name", `%${name || ''}%`)
          .innerJoin("categories", "plates.id", "categories.plate_id")
          .where("categories.Name", category)
          .orderBy("plates.Name");
      }

      const allIngredients = await knex("ingredients").whereIn("plate_id", plates.map(plate => plate.id));
      const platesWithIngredients = plates.map(plate => {
        const plateIngredients = allIngredients.filter(ingredient => ingredient.plate_id === plate.id);
        return {
          ...plate,
          ingredients: plateIngredients.map(ingredient => ingredient.Name)
        };
      });

      return response.json(platesWithIngredients);
    } else {
      plates = await knex("plates").select("*");

      const allIngredients = await knex("ingredients").whereIn("plate_id", plates.map(plate => plate.id));
      const platesWithIngredients = plates.map(plate => {
        const plateIngredients = allIngredients.filter(ingredient => ingredient.plate_id === plate.id);
        return {
          ...plate,
          ingredients: plateIngredients.map(ingredient => ingredient.Name)
        };
      });

      return response.json(platesWithIngredients);
    }
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