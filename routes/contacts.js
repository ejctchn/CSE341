const routes = require('express').Router();
const lesson02Controller = require("../controllers/lesson02")

routes.get('/', lesson02Controller.getAllContacts);

routes.get('/:id', lesson02Controller.getContactById);

routes.post('/', lesson02Controller.postNewContact);

routes.put('/:id', lesson02Controller.updateContact);

routes.delete('/:id', lesson02Controller.deleteContactById);

module.exports = routes;