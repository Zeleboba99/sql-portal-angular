import {Test} from './test';
import {User} from './user';
import {Question} from './question';

export class Attempt {
  public id: number;
  public createdAt: any;
  public mark: number;
  public test: Test;
  public author: User;
  public questions: Question[];


  constructor(id: number, createdAt: any, mark: number, test: Test, author: User, questions: Question[]) {
    this.id = id;
    this.createdAt = createdAt;
    this.mark = mark;
    this.test = test;
    this.author = author;
    this.questions = questions;
  }
}
