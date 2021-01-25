import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from '../model/course';

@Injectable()
export class CourseService {

  private BASE_URL = '/api/courses';
  constructor(private http: HttpClient, private router: Router) { }

  public getCourseById(course_id) {
    return this.http.get<Course>(this.BASE_URL + '/' + course_id);
  }

  public getAllCourses(author_id) {
    return this.http.get<Course[]>(this.BASE_URL + '/author/' + author_id);
  }

  public createCourse(course) {
    return this.http.post(this.BASE_URL, course);
  }

  public deleteCourse(course_id) {
    return this.http.delete(this.BASE_URL + '/' + course_id);
  }
}
