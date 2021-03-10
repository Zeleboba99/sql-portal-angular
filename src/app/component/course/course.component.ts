import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {Course} from '../../model/course';
import {TestService} from '../../service/test.service';
import {Test} from '../../model/test';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public serverError = '';
  public course: Course;
  public tests: Test[];
  public course_id: number;
  public isCurrentUserTeacher = false;
  public selectedTest = null;

  constructor(private router: Router,
              private courseService: CourseService,
              private testService: TestService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.course_id = this.activateRoute.snapshot.queryParams['course_id'];
    this.isCurrentUserTeacher = this.authService.isCurrentUserTeacher();
    if (this.course_id) {
      this.courseService.getCourseById(this.course_id).subscribe(
        res => {
          this.course = res;
          this.testService.getAllTestForCourse(this.course_id).subscribe(
            result => { this.tests = result; },
            error => { this.serverError = error.error.message; }
          );
          },
        error => { this.serverError = error.error.message; }
      );
    }
  }

  onTestClick(test: Test) {
    this.router.navigate(['test'], {queryParams: {course_id: this.course_id, test_id: test.id, db_id: test.dbLocation.id}});
  }

  onCreateTestClick() {
    this.router.navigate(['create-test'], {queryParams: {course_id: this.course_id}});
  }

  onDeleteSelectedTest() {
    this.testService.deleteTest(this.selectedTest.id).subscribe(
      res => {
        $('#deleteModal').modal('hide');
        this.reloadCurrentRoute();
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }

  onSelectTest($event: MouseEvent, test: Test) {
    event.stopPropagation();
    this.selectedTest = test;
    $('#deleteModal').modal('show');
  }

  onEditTest(test_id: number) {
    this.router.navigate(['create-test'], {queryParams: {course_id: this.course_id, test_id: test_id}});
  }

  public isCurrentUserAuthor(course: Course) {
    return this.authService.userLoggedIn.value.id === course.author_id;
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onCheckTestResults(test_id: number) {
    this.router.navigate(['choose-user'], {queryParams: {test_id: test_id}});
  }
}
