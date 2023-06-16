
const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/doc_visits', require('./doc_visit'));
routes.use('/modifications', require('./modification'));

module.exports = routes;