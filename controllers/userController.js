class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async getUserById(req, res) {
    //find user by id
    const user = await this.userService.findUserById(req.params.id);
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
  async loginUser(req, res) {
    const { username, password } = req.validData;
    const token = await this.userService.authenticateUser(username, password);
    res.json({ message: "Login successful", token });
  }
  async createUser(req, res) {
    //     matchedData() is designed to return the validated data after performing the validation process. However, the order of the fields in the returned object might not be exactly the same as the order in the request body.

    // This is because JavaScript objects do not guarantee the order of keys (especially for non-integer keys), and objects in JavaScript are inherently unordered.
    const { name, email, username, password } = req.validData;
    const newUser = await this.userService.createUser(
      name,
      email,
      username,
      password
    );
    res.status(201).json({ id: newUser, message: "User created successfully" });
  }

  async updateUser(req, res) {
    const { name, email } = req.validData;

    const updatedUser = await this.userService.updateUser(
      { name: name, email: email },

      req.params.id
    );
    res
      .status(200)
      .json({ id: updatedUser, message: "User updated successfully" });
  }
  async deleteUser(req, res) {
    const userId = req.params.id;

    await this.userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  }
}
module.exports = UserController;
