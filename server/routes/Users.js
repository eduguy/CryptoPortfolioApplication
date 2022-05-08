const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/UsersController')

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", userController.addNewUser);

module.exports = usersRouter;