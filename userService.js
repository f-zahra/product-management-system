class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(name, email) {
    return this.userRepository.saveNewUser(name, email);
  }
}

module.exports = UserService;
