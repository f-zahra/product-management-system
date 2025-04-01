const CustomError = require("../customError");
const { Op } = require("sequelize");
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

  //service passes transactionobject
  async saveNewUser(name, email, username, password, transaction = null) {
    //find existing record first
    const userRecord = await this.userModel.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
    if (userRecord) {
      if (userRecord.username === username) {
        const error = new CustomError(
          "User with this username already exists.",
          409
        );
        throw error;
      }
      if (userRecord.email === email) {
        const error = new CustomError(
          "User with this email already exists.",
          409
        );
        throw error;
      }
    } //return a promise
    const newUser = await this.userModel.create(
      { name, email, username, password },
      { transaction }
    );
    return newUser.get({ plain: true }); // Return plain object
  }
  //update
  async updateUser(dataUpdated, userId) {
    //find the user first
    const user = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    //handling the unique constraint error
    if (user.dataValues.email && user.dataValues.email === dataUpdated.email) {
      throw new CustomError("User with this email already exist", 409);
    }
    const updatedUser = user.update(dataUpdated);

    return updatedUser;
  }
  //delete
  async deleteUser(userId) {
    //find the user first
    const user = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new CustomError("User not found.", 404);
    }

    //and delete
    user.destroy();
    return user;
  }
}

module.exports = UserRepository;
