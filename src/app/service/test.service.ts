import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Test} from '../model/test';
import {Question} from '../model/question';
import {Attempt} from '../model/attempt';
import {Answer} from '../model/answer';

@Injectable()
export class TestService {

  private BASE_URL = '/api/tests';

  constructor(private http: HttpClient, private router: Router) {
  }

  public getAllTestForCourse(course_id) {
    return this.http.get<Test[]>('/api/courses/' + course_id + '/tests');
  }

  public getTestById(test_id: number) {
    return this.http.get<Test>(this.BASE_URL + '/' + test_id);
  }

  public createTest(course_id: number, test: Test) {
    return this.http.post('/api/courses/' + course_id + '/tests', test);
  }

  public addQuestionsToTest(test_id: number, questions: Question[]) {
    return this.http.post(this.BASE_URL + '/' + test_id + '/questions', questions);
  }

  public passTest(test_id: number, questions: Question[]) {
    return this.http.post(this.BASE_URL + '/' + test_id + '/pass', questions);
  }

  public getAttemptsForTest(test_id: number) {
    return this.http.get<Attempt[]>(this.BASE_URL + '/' + test_id + '/attempts');
  }

  public getAttemptsForTestByUserId(user_id: number, test_id: number) {
    return this.http.get<Attempt[]>( '/api/tests/' + test_id + '/users/' + user_id + '/attempts');
  }

  public updateQuestions(test_id: number, questions: Question[]) {
    return this.http.put(this.BASE_URL + '/' + test_id + '/questions', questions);
  }

  public deleteQuestion() {

  }

  getAttemptById(test_id: number, attempt_id: number) {
    return this.http.get<Attempt>(this.BASE_URL + '/' + test_id + '/attempts/' + attempt_id);
  }

  deleteTest(test_id: any) {
    return this.http.delete(this.BASE_URL + '/' + test_id);
  }

  updateTest(test_id: number, test: Test) {
    return this.http.put(this.BASE_URL + '/' + test_id, test);
  }

  estimateAttempt(attempt_id: number, answers: Answer[]) {
    return this.http.patch('/api/attempts/' + attempt_id, answers);
  }
}
