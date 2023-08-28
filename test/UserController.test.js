// test/UserController.test.js
const sinon = require('sinon');
const { Container } = require('inversify');
const UserController = require('../src/controllers/UserController');
const container = require('../src/app-container');

describe('UserController', () => {
  let sandbox;
  let userController;
  let userServiceMock;

  before(() => {
    // Create a sandbox for stubs and spies
    sandbox = sinon.createSandbox();

    // Create a new container instance for the test
    const testContainer = new Container();

    // Mock the UserService using sinon
    userServiceMock = {
      getUser: sandbox.stub()
    };
    testContainer.bind(container.TYPES.UserService).toConstantValue(userServiceMock);

    // Use the testContainer for the UserController
    userController = new UserController(testContainer.get(container.TYPES.UserService));
  });

  after(() => {
    // Restore sandbox after all tests
    sandbox.restore();
  });

  it('should return a user when valid ID is provided', async () => {
    // Stub the getUser method to return a sample user
    userServiceMock.getUser.resolves({ id: 1, name: 'John' });

    // Simulate a request and response objects
    const req = { params: { id: 1 } };
    const res = { json: sandbox.stub() };

    await userController.getUser(req, res);

    // Check if the response was called with the expected user data
    sinon.assert.calledWith(res.json, { id: 1, name: 'John' });
  });

  it('should handle errors gracefully', async () => {
    // Stub the getUser method null
    userServiceMock.getUser.resolves(null);

    const req = { params: { id: 2 } };
    const res = { json: sandbox.stub(), status: sandbox.stub() };
    res.status.returns(res); // Allow chaining

    await userController.getUser(req, res);

    // Check if the response was called with the correct status and error message
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { error: 'User not found' });
  });
});