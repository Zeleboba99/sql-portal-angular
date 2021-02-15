import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {Db} from '../../model/db';
import {Course} from '../../model/course';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  public serverError = '';
  public courses: Course[] = [];
  public isCurrentUserTeacher = false;
  public selectedCourse: Course = null;

  public selectedPage = 0;
  public size = 5;
  public page = 1;
  public sort = true;
  public coursePage;

  constructor(private router: Router,
              private courseService: CourseService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isCurrentUserTeacher = this.authService.isCurrentUserTeacher();
    this.getCourses(this.selectedPage, this.size);
  }

  getCourses(page: number, size: number) {
    this.courseService.getAllCourses(page, size, this.sort).subscribe(
      res => {
        this.coursePage = res;
        this.courses = res.content;
      },
      error => {
        this.serverError = error;
      }
    );
  }

  onPageSelect(page: number) {
    console.log('selected page : ' + page);
    this.selectedPage = page;
    this.getCourses(page, this.size);
  }

  onCreateCourseClick() {
    this.router.navigate(['create-course']);
  }

  onCourseClick(event, course_id: number) {
    event.stopPropagation();
    this.router.navigate(['course'], {queryParams: {course_id: course_id}});
  }

  public isCurrentUserAuthor(course: Course) {
    return this.authService.userLoggedIn.value.id === course.author_id;
  }

  onEditCourse(course_id: number) {
    this.router.navigate(['create-course'], {queryParams: {course_id: course_id}});
  }

  onDeleteCourse(course_id: number) {

  }

  onSelectCourse(event, course: Course) {
    event.stopPropagation();
    this.selectedCourse = course;
    // document.getElementById('deleteModal').modal('show');

    $('#deleteModal').modal('show');
  }

  onDeleteSelectedCourse() {
    this.courseService.deleteCourse(this.selectedCourse.id).subscribe(
      res => {
        $('#deleteModal').modal('hide');
        this.reloadCurrentRoute();
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


}
