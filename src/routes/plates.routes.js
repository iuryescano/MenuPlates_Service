const { Router } = require("express");

const PlatesController = require("../controllers/PlatesController");

const platesRouter = Router();

const platesController = new PlatesController();

platesRouter.post("/:user_id", platesController.create);

module.exports = platesRouter; // Export app for testing