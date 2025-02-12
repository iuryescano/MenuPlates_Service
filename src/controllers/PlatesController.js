const knex = require("../database/knex");

class PlatesController {
  async create(request, response) {
    // Extraindo os dados do corpo da requisição
    const { Name, Image, Price, Description, category, ingredients } = request.body;
    // Supondo que o user_id venha via parâmetro da rota
    const { user_id } = request.params;

    // Insere o prato na tabela "plates" e captura o id gerado
    const [plate_id] = await knex("plates").insert({
      Name,
      Image,
      Price,
      Description,
      user_id, // relacionamento com o usuário que criou o prato
    });

    // Inserindo as categorias
    // Se "category" for um array, mapeamos cada item para um objeto a ser inserido;
    // caso contrário, consideramos que é uma única categoria.
    const categoriesToInsert = Array.isArray(category)
      ? category.map(catName => ({ plate_id, Name: catName }))
      : [{ plate_id, Name: category }];

    // Insere as categorias vinculadas ao prato (conforme migration, cada registro terá um plate_id)
    if (categoriesToInsert.length) {
      await knex("categories").insert(categoriesToInsert);
    }

    // Inserindo os ingredientes
    // Da mesma forma, se "ingredients" for um array, mapeamos cada item
    const ingredientsToInsert = Array.isArray(ingredients)
      ? ingredients.map(ingName => ({
          plate_id,
          Name: ingName,
          user_id, // se desejar registrar o usuário que associou o ingrediente
        }))
      : [{ plate_id, Name: ingredients, user_id }];

    if (ingredientsToInsert.length) {
      await knex("ingredients").insert(ingredientsToInsert);
    }

    return response.json({ plate_id });
  }
}

module.exports = PlatesController;
