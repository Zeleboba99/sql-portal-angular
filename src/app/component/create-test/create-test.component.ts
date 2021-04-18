import {Component, OnInit} from '@angular/core';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {Test} from '../../model/test';
import {TestService} from '../../service/test.service';
import {DbInfo} from '../../model/db-info';
import {DbService} from '../../service/db.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  public serverError = '';
  public tests = [new Test(0, 'Добавить в начало', 1, 0, null, null, null, null)];
  public test: Test = new Test(0, '', 1, 0, null, new DbInfo(0, '', null, 0, ''), null, null);
  public dbs: DbInfo[] = [];
  public selectedDbId: any;
  public selectedIdOfPreviousTest: any;
  public course_id: number;
  public test_id: number;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private dbService: DbService,
              private activateRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.course_id = this.activateRoute.snapshot.queryParams['course_id'];
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    console.log(this.test);
    if (this.course_id) {
      this.dbService.getAllDbs().subscribe(
        res => {
          this.dbs = res;
          if (this.test_id) {
            this.testService.getTestById(this.test_id).subscribe(
              result => {
                this.test = result;
                console.log(this.test);
              }, error => {
                this.serverError = error.error.message;
              }
            );
          }
        },
        error => {
          this.serverError = error.error.message;
        }
      );
      this.testService.getAllTestForCourse(this.course_id).subscribe(
        result => {
          this.tests = this.tests.concat(result);
        }, error => {
          this.serverError = error.error.message;
        }
      );
    }
  }

  onCreateTestClick() {
    this.test.dbLocation.id = this.selectedDbId;
    this.testService.createTest(this.course_id, this.test).subscribe(
      res => {
        this.router.navigate(['course'], {queryParams: {course_id: this.course_id}});
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }

  onUpdateTestClick() {
    // this.test.dbLocation.id = this.selectedDbId;
    this.testService.updateTest(this.test_id, this.test).subscribe(
      res => {
        this.router.navigate(['course'], {queryParams: {course_id: this.course_id}});
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }
}
