import { v4 as uuidv4 } from 'uuid';

export default class User {
  id: string;
  name: string;
  email: string;

  constructor({ name, email }: Omit<User, 'id'>) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
  }
}
