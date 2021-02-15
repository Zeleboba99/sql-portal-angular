import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from '../model/course';

@Injectable()
export class CourseService {

  private BASE_URL = '/api/courses';

  constructor(private http: HttpClient, private router: Router) {
  }

  public getCourseById(course_id: number) {
    return this.http.get<Course>(this.BASE_URL + '/' + course_id);
  }

  public getCoursesByAuthorId(author_id, page: number, size: number, sort: boolean) {
    return this.http.get<Course[]>(this.BASE_URL + '/author/' + author_id + '?page=' + page +
      '&size=' + size + '&sort=' + sort);
  }

  public getAllCourses(page: number, size: number, sort: boolean) {
    return this.http.get(this.BASE_URL + '?page=' + page +
      '&size=' + size + '&sort=' + sort);
  }

  public createCourse(course) {
    return this.http.post(this.BASE_URL, course);
  }

  public updateCourse(course_id: number, course: Course) {
    return this.http.put(this.BASE_URL + '/' + course_id, course);
  }

  public deleteCourse(course_id) {
    return this.http.delete(this.BASE_URL + '/' + course_id);
  }
}
