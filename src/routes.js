const routes = require('express').Router();

const AddressController = require('./controllers/AddressController');
const CityController = require('./controllers/CityController');
const CompanyController = require('./controllers/CompanyController');
const CountryController = require('./controllers/CountryController');
const StateController = require('./controllers/StateController');
const UserController = require('./controllers/UserController');

// ADDRESS
routes.get('/addresses', AddressController.index);

// CITY
routes.get('/cities', CityController.index);

// COMPANY
routes.get('/companies', CompanyController.index);

// COUNTRY
routes.get('/countries', CountryController.index);

// STATE
routes.get('/states', StateController.index);

// USER
routes.get('/users', UserController.index);

module.exports = routes;