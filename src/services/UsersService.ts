import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
      //verificar se o usuário existe
    const userExists = await this.usersRepository.findOne({ email });
    //se existir, retorná-lo
    if (userExists) {
      return userExists;
    }
    //senão, criá-lo
    const user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
  
    return user;
  }
}

export { UsersService };