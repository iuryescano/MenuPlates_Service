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
}

module.exports = PlatesController;