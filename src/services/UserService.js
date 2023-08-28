// src/services/UserService.js
class UserService {
  // Implement user-related methods here
  getUser(id) {
    if (id === 1)
      return { id: 1, name: 'John' };
    else
      return null;
  }
}

module.exports = UserService;