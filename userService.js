class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  //getuserByid
  async findUserById(userId) {
    return this.userRepository.findUserById(userId);
  }
  //get all users
  async findAllUsers({ limit, offset, order }) {
    return this.userRepository.findAllUsers({ limit, offset, order });
  }
  async createUser(name, email) {
    return this.userRepository.saveNewUser(name, email);
  }
  //update
  async updateUser(updatedUser, userId) {
    return this.userRepository.updateUser(updatedUser, userId);
  }
  //delete
  async deleteUser(userId) {
    return this.userRepository.deleteUser(userId);
  }
}

module.exports = UserService;
