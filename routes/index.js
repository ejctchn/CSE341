
const routes = require('express').Router();
//const lesson02Controller = require("../controllers/lesson02")
/*
routes.get('/', lesson01Controller.eliRoute);

routes.get('/brooke', lesson01Controller.brookeRoute);

module.exports = routes;
*/
routes.use('/', require('./swagger'));
routes.use('/contacts', require('./contacts'));

module.exports = routes;