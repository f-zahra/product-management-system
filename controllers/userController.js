class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async getUserById(req, res) {
    //find user by id
    const user = await this.userService.findUserById(req.params.id);
    // If the user doesn't exist, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details if found
    res.status(200).json(user);
  }
  async getUsers(req, res) {
    let { page, limit } = req.query; // Get from query parameters

    // Set default values if not provided
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit of 10
    const order = req.query.order || "ASC";
    const offset = (page - 1) * limit; // Calculate offset

    // Find all users
    const users = await this.userService.findAllUsers({
      limit,
      offset,
      order: [["name", order]],
    });
    res.status(200).json(users);
  }
  async createUser(req, res) {
    const { name, email } = req.validData; // Now it's safe to destructure
    const newUser = await this.userService.createUser(name, email);
    res.status(201).json(newUser);
  }

  async updateUser(req, res) {
    const { name, email } = req.body;

    const updatedUser = await this.userService.updateUser(
      { name: name, email: email },

      req.params.id
    );
    res.status(200).json(updatedUser);
  }
  async deleteUser(req, res) {
    const userId = req.params.id;

    const userToDelete = await this.userService.deleteUser(userId);
    res
      .status(200)
      .json({ id: userToDelete, message: "User deleted successfully" });
  }
}
module.exports = UserController;
