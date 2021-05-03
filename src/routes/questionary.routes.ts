import { Router } from 'express';
import { parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import QuestionaryRepository from 'repositories/QuestionaryRepository';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuth';
import { getConnection } from '@config/database';

const questionaryRouter = Router();
const questionarysRepository = new QuestionaryRepository();

questionaryRouter.get('/answered', (request, response) => {
  const questionary = questionarysRepository.findAll();

  const data = questionary.map((d: { questionData: any; }) => d.questionData)
  const treatedData = data.find((i: any[]) => i.find((a: { data: string; }) => a.data))
  const dataQuestionary = treatedData.find((r: Promise<any>) => r.id)
  const findAnswer = getConnection().get('answer').filter({questionId: dataQuestionary.id}).value()


  const list: { question: string; answered: { authorAnswer: string; answer: string; }; }[] = []
  findAnswer.map((res: { userId: string; description: string; }) => {
    list.push({
      question: dataQuestionary.question,
      answered: {
        authorAnswer:res.userId,
        answer: res.description
      }
    })
  }
  )
  return response.json(list);
});

questionaryRouter.use(ensureAuthenticated);

questionaryRouter.get('/', (request, response) => {
  const questionary = questionarysRepository.findAll();
  return response.json(questionary);
});

questionaryRouter.post('/', (request, response) => {
  const { title, createdAt, questions } = request.body;
  const user_id = request.user.id;
  const findUser = getConnection().get('users').find({ id: user_id }).value();

  const parsedDate = parseISO(createdAt);
  const questionData = questions.map((v: { question: string }) => {
    return {
      id: uuidv4(),
      question: v.question,
    };
  });
  const questionary = questionarysRepository.create({
    author: findUser.name,
    title,
    date: parsedDate,
    questionData,
  });

  return response.json(questionary);
});

export default questionaryRouter;
