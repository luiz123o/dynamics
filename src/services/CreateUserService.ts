import { getConnection } from '@config/database';
import User from 'models/User';
import UsersRepository from 'repositories/UsersRepository';

interface RequestDTO {
  name: string;
  email: string;
}
class CreateUserService {
  private usersRepository: UsersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ email, name }: RequestDTO): User | void {
    const emailExists = getConnection()
      .get('users')
      .find({ email: email })
      .value();

    if(emailExists){
      throw Error("email exists")
    }

    const user = this.usersRepository.create({
      email,
      name,
    });

    return user;
  }
}

export default CreateUserService;
