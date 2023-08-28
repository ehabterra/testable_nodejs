const { expect } = require('chai');
const UserService = require('../src/services/UserService');

describe('UserService', () => {
    // Test the getUser method
    describe('getUser', () => {
        it('should return a user by ID', async () => {
            const userService = new UserService();
            const user = await userService.getUser(1);

            expect(user).to.deep.equal({ id: 1, name: 'John' });
        });

        it('should return null for non-existing user', async () => {
            const userService = new UserService();
            const user = await userService.getUser(999); // Non-existing ID

            expect(user).to.be.null;
        });
    });

    // Add more test cases for other methods in UserService
});