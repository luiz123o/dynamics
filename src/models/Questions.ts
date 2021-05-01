export default class Question {
  id: string;

  question: string;

  constructor({ question }: Omit<Question, 'id'>) {
    this.question = question;
  }
}
