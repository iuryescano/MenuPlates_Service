const { Router } = require("express");

const PlatesController = require("../controllers/PlatesController");

const platesRouter = Router();

const platesController = new PlatesController();

platesRouter.get("/", platesController.index);
platesRouter.post("/:user_id", platesController.create);
platesRouter.get("/:id", platesController.show);
platesRouter.delete("/:id", platesController.delete);


module.exports = platesRouter; // Export app for testing