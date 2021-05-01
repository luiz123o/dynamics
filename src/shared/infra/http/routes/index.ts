import {  Router } from 'express';
import answerRouter from 'routes/answer.routes';
import questionaryRouter from '../../../../routes/questionary.routes';

const routes = Router();

routes.use("/questionary" , questionaryRouter)
routes.use('/answer', answerRouter)


export default routes;
