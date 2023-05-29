const routes = require('express').Router();
const controller = require("../controllers/lesson05")

routes.get('/', controller.getAllVisits);

routes.post('/', controller.postNewVisit);

routes.put('/:id', controller.updateVisit);

//routes.put('/:id', controller.updateContact);

routes.delete('/:id', controller.deleteVisitById);

module.exports = routes;