import {Component, OnInit} from '@angular/core';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  public serverError = '';
  public course_id: number = null;
  public course: Course = new Course(null, '', '', null, '');

  constructor(private router: Router,
              private courseService: CourseService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.course_id = this.activateRoute.snapshot.queryParams['course_id'];
    if (this.course_id) {
      this.courseService.getCourseById(this.course_id).subscribe(
        res => {
          this.course = res;
        }, error => {
          this.serverError = error.error.message;
        }
      );
    }

  }

  onCreateCourseClick() {
    this.courseService.createCourse(this.course).subscribe(
      res => {
        this.router.navigate(['all-courses']);
      },
      error => {
        this.serverError = error.error.message;
      }
    );
  }

  onUpdateCourseClick() {
    this.courseService.updateCourse(this.course_id, this.course).subscribe(
      res => {
        this.router.navigate(['all-courses']);
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }
}
