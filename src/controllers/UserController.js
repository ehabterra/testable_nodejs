// UserController.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUser(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const user = await this.userService.getUser(userId);
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;