const User = require("./models/user");
const sequelize = require("./db");

class UserRepository {
  async saveNewUser(name, email) {
    //return a promise
    return await sequelize.transaction(async (t) => {
      const newUser = await User.create({ name, email }, { transaction: t });
      return newUser.get({ plain: true }); // Return plain object
    });
  }
}

module.exports = UserRepository;
