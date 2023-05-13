const routes = require('express').Router();
const lesson02Controller = require("../controllers/lesson02")

routes.get('/', lesson02Controller.getAllContacts);

routes.get('/:id', lesson02Controller.getContactById);

module.exports = routes;