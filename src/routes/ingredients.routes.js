const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");

const ingredientsRouter = Router();

const ingredientsController = new IngredientsController();

ingredientsRouter.get("/:user_id", ingredientsController.index);


module.exports = ingredientsRouter; // Export app for testing