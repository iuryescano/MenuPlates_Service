const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const PlatesController = require("../controllers/PlatesController");
const PlateImgController = require("../controllers/PlateImgController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const platesRouter = Router();
const upload = multer(uploadConfig.MULTER);

const platesController = new PlatesController();
const plateImgController = new PlateImgController();

platesRouter.get("/", platesController.index);
platesRouter.post("/:user_id", platesController.create);
platesRouter.get("/", platesController.show);
platesRouter.delete("/:id", platesController.delete);
// Atualizando a rota para não exigir o ID do prato na URL
platesRouter.patch("/image", ensureAuthenticated, upload.single("plateimage"), plateImgController.update);

module.exports = platesRouter; // Export app for testing