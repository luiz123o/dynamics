import { getConnection } from '@config/database';
import AnswerRepository from '../repositories/AnswerRepository';
import Answers from 'models/Answer';

type Location = {
  long: string;

  lat: string;
};

interface RequestDTO {
  questionId: string;
  userId: string;
  description: string;
  location: Location;
  date: Date;
}

class CreateAnswerService {
  private answersRepository: AnswerRepository;

  constructor(answersRepository: AnswerRepository) {
    this.answersRepository = answersRepository;

  }

  public  execute({
    description,
    location,
    date,
    questionId,
    userId,
  }: RequestDTO): Answers | undefined {
    const findData =  getConnection().get('questionary').value()
    const findUser = getConnection().get('users').find({id: userId}).value();

    const data = findData.map((d: { questionData: any; }) => d.questionData)
    const treatedId = data.find((i: any[]) => i.find((a: { id: string; }) => a.id))
    const idExists = treatedId.find((i: { id: string; }) => i.id = questionId)



    if (findUser && idExists) {
      const answer = this.answersRepository.create({
        description,
        location,
        questionId,
        date,
        userId,
      })

      return answer;
    }
    throw Error('O id da questão não existe');
  }
}

export default CreateAnswerService;
