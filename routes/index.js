
const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/doc_visits', require('./doc_visit'));


module.exports = routes;