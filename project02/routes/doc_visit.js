const routes = require('express').Router();
const controller = require("../controllers/lesson05")

routes.get('/', controller.getAllVisits);

//routes.get('/:id', controller.getContactById);

routes.post('/', controller.postNewVisit);

//routes.put('/:id', controller.updateContact);

//routes.delete('/:id', controller.deleteContactById);

module.exports = routes;