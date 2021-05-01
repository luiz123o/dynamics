import {v4 as uuidv4} from 'uuid'
import Question from './Questions'


export default class Questionary {
  id: string

  title: string

  author: string

  date: Date

  questionData: Question[]

  constructor(title: string, author: string, date: Date, questionData: Question[] ){
    this.id = uuidv4()
    this.title = title
    this.author = author
    this.questionData = questionData
    this.date = date
  }
}
