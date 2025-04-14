const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcryptjs");
// Import database connection

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    },
  },
  { schema: "product_management" }
);
// Encrypt password before saving to database
User.beforeSave(async (user) => {
  //The method returns true if the field has been changed (modified) since the instance was loaded or saved, and false otherwise.
  //Sequelize tracks model instances in memory
  //whether the password is different from its original value, which, in the case of a new user, will typically be undefined or the value you’ve set

  if (user.changed("password")) {
    // Only hash if password is modified
    //If we hash the password every time the user is saved (even when unchanged), it will generate a new hash each time, making it impossible to log in because the stored password keeps changing.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});
User.prototype.comparePassword = async function (password) {
  const res = await bcrypt.compare(password, this.password);
  return res;
};
module.exports = User;
