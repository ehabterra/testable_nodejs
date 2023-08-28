// app-container.js
const inversify = require('inversify');
const reflectMetadata = require("reflect-metadata");

const UserService = require('./services/UserService'); 
const UserController = require('./controllers/UserController');

var TYPES = {
    UserService: "UserService",
    UserController: "UserController"
};

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.injectable(), UserController);

inversify.decorate(inversify.inject(TYPES.UserService), UserController, 0);

const container = new inversify.Container();
container.bind('UserService').to(UserService);
container.bind('UserController').to(UserController);

module.exports.TYPES = TYPES;
module.exports.container = container;