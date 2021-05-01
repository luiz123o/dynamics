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

  public execute({
    description,
    location,
    date,
    questionId,
    userId,
  }: RequestDTO): Answers | undefined {
    const findQuestion = getConnection().get('questionary').find().value();

    const questionExists: any = findQuestion.find(
      (data: { questionData: any[] }) =>
        data.questionData.find(question => question.id === questionId),
    );
    console.log(questionExists);

    if (questionExists) {
      const answer = this.answersRepository.create({
        description,
        location,
        questionId,
        date,
        userId,
      });

      return answer;
    }
    throw Error('O id da questão não existe');
  }
}

export default CreateAnswerService;
