import {Course} from './course';
import {Question} from './question';

export class Test {
  public id: number;
  public name: string;
  public maxAttemptsCnt: number;
  public dbLocation: any;
  public course: Course;
  public questions: Question[];

  constructor(id: number, name: string, maxAttemptsCnt: number, dbLocation: any, course: Course, questions: Question[]) {
    this.id = id;
    this.name = name;
    this.maxAttemptsCnt = maxAttemptsCnt;
    this.dbLocation = dbLocation;
    this.course = course;
    this.questions = questions;
  }
}
