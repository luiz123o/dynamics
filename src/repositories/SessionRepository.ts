import { getConnection } from '@config/database';
import Session from 'models/Session';

interface CreateSessionDTO {
  email: string;
}

export default class SessionRepository {
  private user: Session;

  constructor() {
    this.user;
  }
  public  findByEmail({ email }: CreateSessionDTO) {
    this.user = new Session({email});

  const find = getConnection().get('users').find({ email: this.user.email }).value();

    return find;
  }
}
