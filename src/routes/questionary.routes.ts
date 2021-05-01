import { Router } from 'express';
import { parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import QuestionaryRepository from 'repositories/QuestionaryRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuth';

const questionaryRouter = Router();
const questionarysRepository = new QuestionaryRepository();


questionaryRouter.use(ensureAuthenticated)

questionaryRouter.get('/', (request, response) => {
  const questionary = questionarysRepository.findAll()
  return response.json(questionary)
})


questionaryRouter.post('/', (request, response) => {
  const { author, title, createdAt, questions } = request.body;
  const parsedDate = parseISO(createdAt);
  const questionData = questions.map((v: { question: string }) => {
    return {
      id: uuidv4(),
      question: v.question,
    };
  });
  const questionary = questionarysRepository.create({
    author,
    title,
    date: parsedDate,
    questionData,
  });

  return response.json(questionary);
});

export default questionaryRouter;
