const User = require("./models/user");
const sequelize = require("./db");

class UserRepository {
  //getuserByid
  async findUserById(userId) {
    const user = await User.findByPk(userId);

    return user;
  }
  //get all users
  async findAllUsers({ limit, offset, order }) {
    const users = await User.findAll({
      limit: limit,
      offset: offset,
      order: [["name", order]],
    });
    return users;
  }
  async saveNewUser(name, email) {
    //return a promise
    return await sequelize.transaction(async (t) => {
      const newUser = await User.create({ name, email }, { transaction: t });
      return newUser.get({ plain: true }); // Return plain object
    });
  }
  //update
  async updateUser(dataUpdated, userId) {
    const updatedUser = User.update(dataUpdated, {
      where: {
        id: userId,
      },
    });
    return updatedUser;
  }
  //delete
  async deleteUser(userId) {
    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
}

module.exports = UserRepository;
