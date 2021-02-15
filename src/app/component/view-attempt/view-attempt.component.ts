import {Component, OnInit} from '@angular/core';
import {Test} from '../../model/test';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {TestService} from '../../service/test.service';
import {AuthService} from '../../service/auth.service';
import {Attempt} from '../../model/attempt';

@Component({
  selector: 'app-view-attempt',
  templateUrl: './view-attempt.component.html',
  styleUrls: ['./view-attempt.component.css']
})
export class ViewAttemptComponent implements OnInit {

  public serverError = '';
  public test_id: number;
  public attempt_id: number;
  public attempt: Attempt;
  public isAuthor = false;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
  }


  ngOnInit() {
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    this.attempt_id = this.activateRoute.snapshot.queryParams['attempt_id'];
    this.testService.getAttemptById(this.test_id, this.attempt_id).subscribe(
      res => {
        this.attempt = res;
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }
}
