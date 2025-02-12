const { Router } = require("express");

const PlatesController = require("../controllers/PlatesController");

const platesRouter = Router();

const platesController = new PlatesController();

platesRouter.post("/:user_id", platesController.create);
platesRouter.get("/:id", platesController.show);

module.exports = platesRouter; // Export app for testing