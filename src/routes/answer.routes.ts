import { Router } from 'express';
import { parseISO } from 'date-fns';

import AnswerRepository from 'repositories/AnswerRepository';
import CreateAnswerService from 'services/CreateAnswerService';

const answerRouter = Router();
const answerRepository = new AnswerRepository();
/**
 * verificar se existe uma question com a id
 * usuario deve estar logado
 */

answerRouter.post('/', async (request, response) => {
  try {
    const { description, date, questionId, userId, location } = request.body;
    const parsedDate = parseISO(date);

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
