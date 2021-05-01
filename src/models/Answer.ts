import {v4 as uuidv4} from 'uuid'
import Location from './Location'

type LocationProps = {
  long: string

  lat: string
}

export default class Answers {
  id: string

  questionId: string

  userId: string

  description: string

  location: LocationProps

  date: Date



  constructor(questionId: string, userId: string, description: string, location: Location, date: Date){
    this.id = uuidv4()
    this.questionId = questionId
    this.userId = userId
    this.description = description
    this.location = location
    this.date = date

  }
}


