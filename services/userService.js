class UserService {
  constructor(userRepository, transactionHandler) {
    this.userRepository = userRepository;
    this.transactionHandler = transactionHandler;
  }
  //getuserByid
  async findUserById(userId) {
    return await this.userRepository.findUserById(userId);
  }
  //get all users
  async findAllUsers(queryOptions) {
    return await this.userRepository.findAllUsers(queryOptions);
  }
  async authenticateUser(username, password) {
    //find user
    const foundUser = await this.userRepository.findUserByUsername(username);

    return foundUser;
  }
  async createUser(name, email, username, password) {
    //transaction is abstracted in case another db is implemented
    return await this.transactionHandler(async (t) => {
      const newUser = await this.userRepository.saveNewUser(
        name,
        email,
        username,
        password,
        t
      );
      return newUser;
    });
  }

  //update
  async updateUser(updatedUser, userId) {
    return await this.userRepository.updateUser(updatedUser, userId);
  }
  //delete
  async deleteUser(userId) {
    return await this.userRepository.deleteUser(userId);
  }
}

module.exports = UserService;
