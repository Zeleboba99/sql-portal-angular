import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Course} from '../../model/course';
import {Test} from '../../model/test';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {TestService} from '../../service/test.service';
import {Question} from '../../model/question';
import {AuthService} from '../../service/auth.service';
import {Answer} from '../../model/answer';
import * as codemirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public serverError = '';
  public test: Test;
  public course: Course;
  public test_id: number;
  public course_id: number;
  public isAuthor = false;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    this.course_id = this.activateRoute.snapshot.queryParams['course_id'];
    this.courseService.getCourseById(this.course_id).subscribe(
      res => {
        this.course = res;
        if (this.course.author_id === this.authService.userLoggedIn.value.id) {
          this.isAuthor = true;
        }
        this.testService.getTestById(this.test_id).subscribe(
          result => {
            this.test = result;
            if (!this.test.questions.length) {
              this.onAddQuestion();

            }
          },
          error => {
            this.serverError = error;
          }
        );
      },
      error => {
        this.serverError = error;
      }
    );
  }


  onAddQuestion() {
    this.test.questions.push(new Question(null, '', new Answer(null, '', null)));
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

  onSaveTest() {
    this.testService.addQuestionsToTest(this.test_id, this.test.questions).subscribe(
      res => {
        this.router.navigate(['course'], {queryParams: {course_id: this.course_id}});
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }

  onRemoveQuestionClick(questionIndex: number) {
    this.test.questions.splice(questionIndex, 1);
  }

  onUpdateTest() {
    this.testService.updateQuestions(this.test_id, this.test.questions).subscribe(
      res => {
        this.router.navigate(['course'], {queryParams: {course_id: this.course_id}});
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }
}
