import {Answer} from './answer';

export class Question {
  public id: number;
  public text: string;
  public answer: Answer;

  constructor(id: number, text: string, answer: Answer) {
    this.id = id;
    this.text = text;
    this.answer = answer;
  }
}
