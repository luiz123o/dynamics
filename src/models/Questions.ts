import {v4 as uuidv4} from 'uuid'

export default class Question {
  id: string;

  question: string;

  constructor({question}: Omit<Question, 'id'>){


    this.question = question
  }
}

