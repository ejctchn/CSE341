const routes = require('express').Router();
const lesson01Controller = require("../controllers/lesson01")

routes.get('/', lesson01Controller.eliRoute);

routes.get('/brooke', lesson01Controller.brookeRoute);

module.exports = routes;