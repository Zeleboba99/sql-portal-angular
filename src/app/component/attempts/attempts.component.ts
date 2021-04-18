import {Component, OnInit} from '@angular/core';
import {Test} from '../../model/test';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {TestService} from '../../service/test.service';
import {AuthService} from '../../service/auth.service';
import {Attempt} from '../../model/attempt';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.css']
})
export class AttemptsComponent implements OnInit {

  public serverError = '';
  public test_id: number;
  public attempts: Attempt[] = [];
  public isAuthor = false;
  public test: Test;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    this.testService.getTestById(this.test_id).subscribe(
      result => {
        this.test = result;
        this.testService.getAttemptsForTest(this.test_id).subscribe(
          res => {
            this.attempts = res;
          },
          error => {
            this.serverError = error.error.message;
          }
        );
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }

  onAttemptClick(attempt_id: number) {
    this.router.navigate(['view-attempt'], {queryParams: {test_id: this.test_id, attempt_id: attempt_id}});
  }

  convertToDate(date: any) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('ru-RU', {dateStyle: 'full', timeStyle: 'medium'});
  }

  isEstimated(attempt: Attempt) {
    return attempt.mark;
  }

  calculateMarkForAttempt(attempt: Attempt) {
    let grade = 0;
    attempt.questions.forEach(q => grade += q.answer.grade);
    return grade / attempt.questions.length;
  }
}
