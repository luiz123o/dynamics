
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import SessionRepository from 'repositories/SessionRepository';
import CreateSessionService from 'services/CreateSessionService';


const sessionRepository = new SessionRepository();


export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {email} = request.body;

    const createSession = new CreateSessionService(sessionRepository);

    const {user, token} = await createSession.execute({
      email
    })


    return response.json({ user: user, token });
  }
}
