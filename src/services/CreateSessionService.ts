import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import SessionRepository from 'repositories/SessionRepository';
import Session from 'models/Session';

interface IRequest {
  email: string;
}
interface IResponse {
  user: Session;
  token: string;
}
class CreateSessionService {
  private sessionRepository: SessionRepository;
  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  public  execute({ email }: IRequest) {
    const user =  this.sessionRepository.findByEmail({email});

    if (!user) {
      throw Error('email not exists');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
