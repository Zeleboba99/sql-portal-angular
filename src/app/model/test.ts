import {Course} from './course';
import {Question} from './question';

export class Test {
  public id: number;
  public name: string;
  public number: number;
  public previousTestId: number;
  public maxAttemptsCnt: number;
  public dbLocation: any;
  public course: Course;
  public questions: Question[];

  constructor(id: number,
              name: string,
              number: number,
              previousTestId: number,
              maxAttemptsCnt: number,
              dbLocation: any,
              course: Course,
              questions: Question[]) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.previousTestId = previousTestId;
    this.maxAttemptsCnt = maxAttemptsCnt;
    this.dbLocation = dbLocation;
    this.course = course;
    this.questions = questions;
  }
}
