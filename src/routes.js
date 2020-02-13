const routes = require('express').Router();
const authMiddleware = require('./middlewares/auth');

const AddressController = require('./controllers/AddressController');
const CityController = require('./controllers/CityController');
const CompanyController = require('./controllers/CompanyController');
const CountryController = require('./controllers/CountryController');
const StateController = require('./controllers/StateController');
const UserController = require('./controllers/UserController');
const LocationController = require('./controllers/LocationController');
const PublicChatController = require('./controllers/PublicChatController');
const AuthenticationController = require('./controllers/AuthenticationController');

// ADDRESS
routes.get('/addresses', AddressController.index);
routes.get('/addresses/:id', AddressController.show);
routes.post('/addresses', AddressController.store);
routes.put('/addresses/:id', AddressController.update);
routes.delete('/addresses/:id', AddressController.destroy);

// CITY
routes.get('/cities', CityController.index);
routes.get('/cities/:id', CityController.show);
routes.post('/cities', CityController.store);
routes.put('/cities/:id', CityController.update);
routes.delete('/cities/:id', CityController.destroy);

// COMPANY
routes.get('/companies', CompanyController.index);
routes.get('/companies/:id', CompanyController.show);
routes.post('/companies', CompanyController.store);
routes.put('/companies/:id', CompanyController.update);
routes.delete('/companies/:id', CompanyController.destroy);

// COUNTRY
routes.get('/countries', CountryController.index);
routes.get('/countries/:id', CountryController.show);
routes.post('/countries', CountryController.store);
routes.put('/countries/:id', CountryController.update);
routes.delete('/countries/:id', CountryController.destroy);

// STATE
routes.get('/states', StateController.index);
routes.get('/states/:id', StateController.show);
routes.post('/states', StateController.store);
routes.put('/states/:id', StateController.update);
routes.delete('/states/:id', StateController.destroy);

// USER
routes.use('/users', [ authMiddleware ]);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

// authentication
routes.post('/authentication/login', AuthenticationController.login);
routes.post('/authentication/login/google', AuthenticationController.login_google);
routes.post('/authentication/register', AuthenticationController.register);


routes.use('/location', [ authMiddleware ]);
routes.get('/location', LocationController.show);

routes.use('/public_chat', [ authMiddleware ]);
routes.get('/public_chat/:id', PublicChatController.show);

module.exports = routes;