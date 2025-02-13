const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();

// function myMiddleware(request, response, next) {
  //console.log("Voce passou pelo middleware") ;

 // if (!request.body.isAdmin) {
 //   return response.status(401).json({ error: "Usuario nao autenticado" });
 // } 

 // next();
//}

const userController = new UsersController();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated,  userController.update);

module.exports = usersRouter; // Export app for testing