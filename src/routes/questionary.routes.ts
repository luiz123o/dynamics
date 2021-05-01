import { Router } from 'express';
import { parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import QuestionaryRepository from 'repositories/QuestionaryRepository';

const questionaryRouter = Router();
const questionarysRepository = new QuestionaryRepository();

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
