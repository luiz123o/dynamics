import { Router } from 'express';
import answerRouter from 'routes/answer.routes';
import sessionsRouter from 'routes/session.routes';
import userRouter from 'routes/users.routes';
import questionaryRouter from '../../../../routes/questionary.routes';

const routes = Router();
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/questionary', questionaryRouter);
routes.use('/answer', answerRouter);

export default routes;
