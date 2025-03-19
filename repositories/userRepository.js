const CustomError = require("../customError");
//TODO :Implement repository interface for better abstraction and loose coupling
class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  //getuserByid
  async findUserById(userId) {
    const user = await this.userModel.findByPk(userId);
    //if record not found
    if (!user) {
      // If no record is found, throw a custom error
      const error = new CustomError("User not found", 404);
      //passed to the error handler
      throw error;
    }

    return user;
  }
  //get all users
  //queryOptions : pagination and sorting
  async findAllUsers(queryOptions = null) {
    const users = await this.userModel.findAll(queryOptions);
    return users;
  }
  async saveNewUser(name, email, transaction = null) {
    //find existing record first
    const userRecord = await this.userModel.findOne({ where: { email } });
    if (userRecord) {
      const error = new CustomError(
        "User with this email already exists.",
        409
      );
      throw error;
    } //return a promise
    const newUser = await this.userModel.create(
      { name, email },
      { transaction }
    );
    return newUser.get({ plain: true }); // Return plain object
  }
  //update
  async updateUser(dataUpdated, userId) {
    const updatedUser = await this.userModel.update(dataUpdated, {
      where: {
        id: userId,
      },
    });
    if (updatedUser[0] === 0) {
      throw new CustomError("User not found.", 404);
    }
    return updatedUser;
  }
  //delete
  async deleteUser(userId) {
    const deletedUser = await this.userModel.destroy({
      where: {
        id: userId,
      },
    });
    if (deletedUser === 0) {
      throw new CustomError("User not found.", 404);
    }
    return deletedUser;
  }
}

module.exports = UserRepository;
