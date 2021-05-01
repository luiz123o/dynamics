import { Router, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from 'controllers/SessionController';


const sessionsRouter = Router();
const sessionControler = new SessionsController()

sessionsRouter.post(
  '/', sessionControler.create
);

export default sessionsRouter;
