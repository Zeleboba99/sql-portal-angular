import {Test} from './test';
import {User} from './user';
import {Question} from './question';

export class Attempt {
  public id: number;
  public createdAt: any;
  public test: Test;
  public author: User;
  public questions: Question[];


  constructor(id: number, createdAt: any, test: Test, author: User, questions: Question[]) {
    this.id = id;
    this.createdAt = createdAt;
    this.test = test;
    this.author = author;
    this.questions = questions;
  }
}
