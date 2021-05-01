import { Router } from 'express';
import { parseISO } from 'date-fns';

import AnswerRepository from 'repositories/AnswerRepository';
import CreateAnswerService from 'services/CreateAnswerService';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuth';

const answerRouter = Router();
const answerRepository = new AnswerRepository();
/**
 * verificar se existe uma question com a id
 * usuario deve estar logado
 */
answerRouter.use(ensureAuthenticated)

answerRouter.post('/', async (request, response) => {
  try {
    const { description, date, questionId, location } = request.body;
    const parsedDate = parseISO(date);
    const userId = request.user.id;

    const createAnswer = new CreateAnswerService(answerRepository);

    const answer = createAnswer.execute({
      description,
      date: parsedDate,
      location,
      questionId,
      userId,
    });

    return response.json(answer);
  } catch (err) {
    return response.status(400).json({error: err.message})
  }
});

export default answerRouter;
