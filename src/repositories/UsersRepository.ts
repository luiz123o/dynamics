import { getConnection } from '@config/database';
import User from 'models/User';

interface CreateUserDTO {
  name: string;
  email: string;
}
interface FindUserDTO {
  id: string
}

export default class UsersRepository {
  private users: User;

  constructor() {
    this.users;
  }
  public findById({id}: FindUserDTO){
    this.users = getConnection().get('users').find({id: id}).value();
    return this.users
  }

  public create({ email, name }: CreateUserDTO) {
    this.users = new User({ name, email });

    getConnection().get('users').push(this.users).write();

    return this.users;
  }
}
