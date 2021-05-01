import Questionary from "models/Questionary";
import {getConnection} from '@config/database'

type Question = {
  id: string;
  question: string
}

interface CreateQuestionaryDTO {

  author: string;
  title: string;
  date: Date;
  questionData: Question[]
}


export default class QuestionaryRepository {
  private questionarys: Questionary[];

  constructor(){
    this.questionarys = []
  }
  public create({title, author, date, questionData}: CreateQuestionaryDTO ){

  const questionary = new Questionary(title, author, date, questionData)
  this.questionarys.push(questionary)

    getConnection().get("questionary").push(this.questionarys).write()

    return questionary;
  }


}
