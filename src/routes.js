const routes = require('express').Router();

const UserController = require('./controllers/UserController');

// USER
routes.get('/users', UserController.index);

module.exports = routes;