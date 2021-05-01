import Answer from "models/Answer";
import {getConnection} from '@config/database'

type Location = {
  long: string
  lat: string
}

interface CreateAnswerDTO {

  questionId: string
  userId: string
  description: string
  location: Location
  date: Date
}


export default class AnswerRepository {
  private answers: Answer[];

  constructor(){
    this.answers = []
  }
  public create({description, date, questionId, userId, location}: CreateAnswerDTO ){

  const answer = new Answer(questionId,userId, description, location, date)
  this.answers.push(answer)

    getConnection().get("answer").push(this.answers).write()

    return answer;
  }



}
