export default class Session {
  email: string;
  id: string;


  constructor({ email }: Omit<Session, 'id'>) {
    this.email = email;
  }
}
