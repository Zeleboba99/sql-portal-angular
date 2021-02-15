import {Component, OnInit} from '@angular/core';
import {Test} from '../../model/test';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {TestService} from '../../service/test.service';
import {AuthService} from '../../service/auth.service';
import {Question} from '../../model/question';
import {Answer} from '../../model/answer';
import {Attempt} from '../../model/attempt';

@Component({
  selector: 'app-check-attempt',
  templateUrl: './check-attempt.component.html',
  styleUrls: ['./check-attempt.component.css']
})
export class CheckAttemptComponent implements OnInit {

  public serverError = '';
  public test: Test;
  public course: Course;
  public test_id: number;
  public attempt_id: number;
  public user_id: number;
  public attempt: Attempt;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    this.user_id = this.activateRoute.snapshot.queryParams['user_id'];
    this.attempt_id = this.activateRoute.snapshot.queryParams['attempt_id'];
    this.testService.getTestById(this.test_id).subscribe(
      result => {
        this.test = result;
        this.testService.getAttemptById(this.test_id, this.attempt_id).subscribe(
          res => {
            this.attempt = res;
          }, error => {
            this.serverError = error.error.message;
          }
        );
      },
      error => {
        this.serverError = error;
      }
    );
  }

  onSendTest() {
    this.testService.passTest(this.test_id, this.test.questions).subscribe(
      res => {
        this.router.navigate(['attempts'], {queryParams: {test_id: this.test_id}});
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }

  public getRightAnswer(question_id: number) {
    return this.test.questions.find(q => q.id === question_id).answer.text;
  }

  onEstimateAttempt() {
    const answers = this.attempt.questions.map(q => q.answer);
    this.testService.estimateAttempt(this.attempt_id, answers).subscribe(
      res => {
        this.router.navigate(['choose-user'], {queryParams: {test_id: this.test_id}});
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }
}
